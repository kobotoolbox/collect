// Replace string occurrences with their Kobo equivalents

// install replace globally "npm install replace"
// copy all values-* folders from collect_app/src/main to collect_app/src/kobo
// copy collect_app/src/main/values/strings.xml to collect_app/src/kobo/values/strings.xml
// do not delete collect_app/src/kobo/values/untranslated.xml
// and then run "node kobo-string-replace.js"

var replace = require("replace"),
  koboPath = ["collect_app/src/kobo/res"];

replace({
  regex: "ODK Collect",
  replacement: "KoBoCollect",
  paths: koboPath,
  recursive: true,
  silent: true,
});

replace({
  regex: "Open Data Kit",
  replacement: "KoBoToolbox",
  paths: koboPath,
  recursive: true,
  silent: true,
});

replace({
  regex: "ODK",
  replacement: "KoBoToolbox",
  paths: koboPath,
  recursive: true,
  silent: true,
});
