class TestBase {
    log(log) {
        cy.log(log);
        cy.task('log', log);
    }

    visit(endpoint, parameters) {
        let targetUrl = baseUrl;
        if (endpoint != null) {
            targetUrl += endpoint;
        }
        targetUrl += '?';

        let query_parameters = '';
        parameters.forEach((p) => {
            query_parameters += p + '&';
        });
        query_parameters += 'prforceGroups=default_to_fallback';

        targetUrl += query_parameters;
        cy.visit(targetUrl);
    }

    prepareSut() {
        if (platform === 'mobile') {
            cy.viewport('iphone-5');
        } else if (platform === 'desktop') {
            cy.viewport(1280, 1024);
        }
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        this.visit(null, []);
    }

    checkTotalPageCount() {
        this.checkTotalResultsCount();
        cy.get('@totalResultsCount').then((res) => {
            cy.get(locators.jds)
                .its('length')
                .then((jdsonthepage) => {
                    cy.wrap(Math.ceil(res / jdsonthepage)).as('totalPageCount');
                });
        });
    }

    checkTotalResultsCount() {
        cy.get(locators.jobResultsHeadline)
            .invoke('text')
            .then((totalResultsCount) => {
                cy.wrap(parseInt(totalResultsCount.replaceAll(',', ''))).as(
                    'totalResultsCount'
                );
            });
    }

    results_verification(checklist) {
        base.log('Check that button navigates to results');
        checklist.forEach((checklistItem) => {
            let identifier;
            let locator;
            let expected_text;
            if (checklistItem === 'keyword') {
                identifier = keyword_identifier;
                locator = locators.keyword_textbox;
                expected_text = query_keyword;
            } else if (checklistItem === 'location') {
                identifier = location_identifier;
                locator = locators.location_textbox;
                expected_text = query_location;
            }

            cy.url().should('include', identifier + '=' + expected_text);
            cy.get(locator).should('have.value', expected_text);
        });
    }
}
export default TestBase;
