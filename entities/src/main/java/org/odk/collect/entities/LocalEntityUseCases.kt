package org.odk.collect.entities

import org.javarosa.core.model.instance.CsvExternalInstance
import org.javarosa.core.model.instance.TreeElement
import org.javarosa.entities.EntityAction
import org.javarosa.entities.internal.Entities
import java.io.File

object LocalEntityUseCases {

    @JvmStatic
    fun updateLocalEntitiesFromForm(
        formEntities: Entities?,
        entitiesRepository: EntitiesRepository
    ) {
        formEntities?.entities?.forEach { formEntity ->
            val id = formEntity.id
            if (id != null && entitiesRepository.getLists().contains(formEntity.dataset)) {
                if (formEntity.action != EntityAction.UPDATE || entitiesRepository.getEntities(formEntity.dataset).any { it.id == id }) {
                    val entity = Entity(
                        formEntity.dataset,
                        id,
                        formEntity.label,
                        formEntity.version,
                        formEntity.properties
                    )

                    entitiesRepository.save(entity)
                }
            }
        }
    }

    fun updateLocalEntitiesFromServer(
        list: String,
        serverList: File,
        entitiesRepository: EntitiesRepository
    ) {
        val root = try {
            CsvExternalInstance().parse(list, serverList.absolutePath)
        } catch (e: Exception) {
            return
        }

        val localEntities = entitiesRepository.getEntities(list)
        val serverEntities = root.getChildrenWithName("item")

        val accumulator =
            Pair(arrayOf<Entity>(), localEntities.associateBy { it.id }.toMutableMap())
        val (newAndUpdated, missingFromServer) = serverEntities.fold(accumulator) { (new, missing), item ->
            val entity = parseEntityFromItem(item, list) ?: return
            val existing = missing.remove(entity.id)

            if (existing == null || existing.version < entity.version) {
                Pair(new + entity, missing)
            } else if (existing.state == Entity.State.OFFLINE) {
                Pair(new + existing.copy(state = Entity.State.ONLINE), missing)
            } else {
                Pair(new, missing)
            }
        }

        missingFromServer.values.forEach {
            if (it.state == Entity.State.ONLINE) {
                entitiesRepository.delete(it.id)
            }
        }

        entitiesRepository.save(*newAndUpdated)
    }

    private fun parseEntityFromItem(
        item: TreeElement,
        list: String
    ): Entity? {
        val id = item.getFirstChild(EntityItemElement.ID)?.value?.value as? String
        val label = item.getFirstChild(EntityItemElement.LABEL)?.value?.value as? String
        val version =
            (item.getFirstChild(EntityItemElement.VERSION)?.value?.value as? String)?.toInt()
        if (id == null || label == null || version == null) {
            return null
        }

        val properties = 0.until(item.numChildren)
            .fold(emptyList<Pair<String, String>>()) { properties, index ->
                val child = item.getChildAt(index)

                if (!listOf(
                        EntityItemElement.ID,
                        EntityItemElement.LABEL,
                        EntityItemElement.VERSION
                    ).contains(child.name)
                ) {
                    properties + Pair(child.name, child.value!!.value as String)
                } else {
                    properties
                }
            }

        val entity = Entity(list, id, label, version, properties, state = Entity.State.ONLINE)
        return entity
    }
}
