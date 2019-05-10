// Replace string occurrences with their Kobo equivalents
// install replace globally "npm install replace"
// and then run "node string-replace.js"

var replace = require("replace");

replace({
    regex: '<string name="click_to_web">.*<',
    replacement:
        '<string name="click_to_web">KoBoCollect is part of KoBoToolbox (kobotoolbox.org)\\n\\nKoBoCollect is based on the OpenDataKit<',
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: "https://opendatakit.org",
    replacement: "http://www.kobotoolbox.org",
    paths: [
        "collect_app/src/main/java/org/odk/collect/android/activities/AboutActivity.java"
    ],
    recursive: true,
    silent: true
});

replace({
    regex: "ODK Aggregate",
    replacement: "KoBoToolbox",
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: "ODK Collect",
    replacement: "KoBoCollect",
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: "Open Data Kit .ODK.",
    replacement: "KoBoToolbox",
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: "ODK",
    replacement: "KoBoToolbox",
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: '<string name="main_menu_details">.*<',
    replacement:
        '<string name="main_menu_details">Part of KoBoToolbox\\nBased on ODK Collect<',
    paths: ["collect_app/src/main/res"],
    recursive: true,
    silent: true
});

replace({
    regex: "<h3>\\n    Apache License Version 2.0, January 2004\\n</h3>",
    replacement:
        "<h3>ODK Collect</h3><h3>Apache License Version 2.0, January 2004</h3>",
    paths: ["collect_app/src/main/assets/open_source_licenses.html"],
    silent: true
});

// This is likely too broad
// replace({
//     regex: "ODK",
//     replacement: "KoboToolbox",
//     paths: ['collect_app/src/main/res'],
//     recursive: true,
//     silent: true
// });
