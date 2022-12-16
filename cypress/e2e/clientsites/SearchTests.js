describe('Search Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Search with Keyword ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Fill out query keyword');
                cy.get(locators.keyword_textbox).type(query_keyword);

                base.log('Perform the search by clicking button');
                cy.get(locators.searchButton).click();

                base.results_verification(['keyword']);
            }
        );

        it(
            'Search with Location ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Fill out location');
                cy.get(locators.location_textbox).type(query_location);

                base.log('Perform the search by clicking button');
                cy.get(locators.searchButton).click();

                base.results_verification(['location']);
            }
        );

        it(
            'Search with Keyword and Location ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Fill out user queries');
                cy.get(locators.keyword_textbox).type(query_keyword);
                cy.get(locators.location_textbox).type(query_location);

                base.log('Perform the search by clicking button');
                cy.get(locators.searchButton).click();

                base.results_verification(['keyword', 'location']);
            }
        );

        it(
            'Search by using key strokes ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Fill out user queries');
                cy.get(locators.keyword_textbox)
                    .type(query_keyword)
                    .tab()
                    .type(query_location)
                    .type('{enter}');

                base.results_verification(['keyword', 'location']);
            }
        );

        it(
            'Search after another one ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Perform a query');
                cy.get(locators.keyword_textbox)
                    .type(query_keyword)
                    .type('{enter}');
                base.results_verification(['keyword']);

                base.log('Perform another query in the results page');
                cy.get(locators.keyword_textbox).clear();
                cy.get(locators.location_textbox).type(
                    query_location + '{enter}'
                );
                base.results_verification(['location']);
            }
        );

        it(
            'Empty Search ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Empty Search');
                cy.get(locators.keyword_textbox).type('{enter}');
                cy.get(locators.searchErrorAlert).should('be.visible');

                cy.get(locators.searchButton).click();
                cy.get(locators.searchErrorAlert).should('be.visible');

                cy.get(locators.keyword_textbox).type(
                    query_keyword + '{enter}'
                );
                cy.get(locators.searchErrorAlert).should('not.exist');
                base.results_verification(['keyword']);

                base.log('Perform another query in the results page');
                cy.get(locators.keyword_textbox).clear().type('{enter}');
                cy.get(locators.searchErrorAlert).should('be.visible');
            }
        );
    });
});
