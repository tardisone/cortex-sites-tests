import './commands';
import TestBase from '../e2e/testbase/TestBase';
import Locators from '../e2e/locators/Locators';
require('cypress-plugin-tab');

function suppressFetchLogs() {
    const origLog = Cypress.log;
    Cypress.log = function (opts, ...other) {
        if (opts.displayName === 'fetch') {
            return;
        }
        return origLog(opts, ...other);
    };
}

function setSiteSpecificVariables() {
    globalThis.stage = Cypress.env().stage;
    globalThis.app = Cypress.env().app;
    globalThis.query_keyword = 'engineer';
    globalThis.query_location = 'location';
    globalThis.baseUrl =
        'https://' +
        globalThis.app +
        '-' +
        globalThis.stage +
        '.cortexsdk.com/';
    let jobsEndpoint = 'jobs?';
    let keyword_identifier = 'ak';
    let location_identifier = 'l';
    let radius_identifier = 'sr';
    let query_city = 'ontario';
    let recentSearchHeader = 'Recent Searches';
    switch (app) {
        case 'careesma':
            keyword_identifier = 'q';
            location_identifier = 'lc';
            query_city = 'pune';
            break;
        case 'workopolis':
            recentSearchHeader = 'Recent searches';
            jobsEndpoint = 'jobsearch/find-jobs?';
            break;
        case 'engineerjobs':
            jobsEndpoint = 'jobs/search?';
            recentSearchHeader = 'Recent searches';
            query_city = 'texas';
            break;
        case 'gigajob':
            jobsEndpoint = 'suche?';
            keyword_identifier = 's';
            location_identifier = 'o';
            query_city = 'berlin';
            radius_identifier = 'lr';
            recentSearchHeader = 'Letzte Suchanfragen';
            break;
        case 'wowjobs':
            jobsEndpoint = 'BrowseResults.aspx?';
            keyword_identifier = 'q';
            break;
    }
    globalThis.keyword_identifier = keyword_identifier;
    globalThis.location_identifier = location_identifier;
    globalThis.query_city = query_city;
    globalThis.radius_identifier = radius_identifier;
    globalThis.recentSearchHeader = recentSearchHeader;
    globalThis.jobsEndpoint = jobsEndpoint;
    globalThis.base = new TestBase();

    return true;
}

function excludeTests(currentTest) {
    let test_priority = currentTest.priority;
    let applicable_system_for_current_test = currentTest.app;
    let known_bug = currentTest.known_bug;
    let exclude_known_bug = currentTest.exclude_known_bug;
    globalThis.platform = currentTest.execPlatform;
    globalThis.locators = new Locators();
    if (
        Cypress.env().scope != test_priority ||
        (typeof applicable_system_for_current_test != 'undefined' &&
            !applicable_system_for_current_test.includes(globalThis.app)) ||
        (known_bug != null &&
            (exclude_known_bug === undefined ||
                (exclude_known_bug != null &&
                    !exclude_known_bug.includes(globalThis.app)))) ||
        (platform != 'undefined' &&
            !Cypress.env().executionPlatforms.includes(platform))
    ) {
        return true;
    }
    return false;
}

before(function () {
    if (setSiteSpecificVariables()) {
        suppressFetchLogs();
        cy.visit(baseUrl);
    }
});

beforeEach(function () {
    if (excludeTests(this.currentTest._testConfig.unverifiedTestConfig)) {
        this.skip();
    } else {
        base.log(
            '------\nStart test: ' + this.currentTest.title + '\n........'
        );
        base.prepareSut();
    }
});
