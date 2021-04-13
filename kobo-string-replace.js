// Replace string occurrences with their Kobo equivalents
// run "npm install"
// and then "node kobo-string-replace.js"

var replace = require("replace");

replace({
    regex: "odk_forum_summary\">.*<",
    replacement: "odk_forum_summary\">Join the forum to get support and connect with other users!<",
    paths: ['strings/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: "https?://getodk.org",
    replacement: "http://www.kobotoolbox.org",
    paths: ['collect_app/src/main/java/org/odk/collect/android/activities/AboutActivity.kt', 'strings/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: "https://forum.getodk.org",
    replacement: "https://community.kobotoolbox.org",
    paths: ['collect_app/src/main/java/org/odk/collect/android/activities/AboutActivity.kt', 'strings/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: "ODK Collect",
    replacement: "KoboCollect",
    paths: ['strings/src/main/res', 'collect_app/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: 'Open Data Kit .ODK.',
    replacement: "KoboToolbox",
    paths: ['strings/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: 'ODK',
    replacement: "KoboToolbox",
    paths: ['strings/src/main/res', 'collect_app/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: "odk_website_summary\">.*<",
    replacement: "odk_website_summary\">KoboCollect is part of KoboToolbox and based on ODK Collect.<",
    paths: ['strings/src/main/res'],
    recursive: true,
    silent: true
});

replace({
    regex: 'https://demo.getodk.org',
    replacement: "https://kc.kobotoolbox.org/kobodemouser",
    paths: ['collect_app/src/main/java/org/odk/collect/android/preferences/'],
    recursive: true,
    silent: true
});

replace({
    regex: 'support@getodk.org',
    replacement: "support@kobotoolbox.org",
    paths: ['collect_app/src/main/java/org/odk/collect/android/tasks'],
    recursive: true,
    silent: true
});