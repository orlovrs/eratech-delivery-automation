const reporter = require('cucumber-html-reporter');

reporter.generate({
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        "App": "Google Docs API",
        "Test Environment": "CI"
    }
});