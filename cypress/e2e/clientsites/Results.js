describe('Results Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Query Results ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Query with keyword');
                cy.get(locators.keyword_textbox).type(
                    query_keyword + '{enter}'
                );

                base.log('Check Results Count');
                base.checkTotalResultsCount();
                cy.get('@totalResultsCount').then((res) => {
                    cy.get(locators.jds).its('length').should('be.lte', res);
                });
            }
        );
    });
});
