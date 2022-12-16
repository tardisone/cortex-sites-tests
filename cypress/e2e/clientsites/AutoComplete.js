describe('AutoCompletion Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Keyword AutoCompletion ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Start typing keyword');
                cy.get(locators.keyword_textbox).type(' ');

                base.log('Perform the search by clicking button');
                cy.get(locators.keyword_textbox)
                    .next()
                    .get(locators.autoCompleteItems)
                    .its('length')
                    .should('be.gte', 0);
            }
        );

        it(
            'Location AutoCompletion ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Start typing keyword');
                cy.get(locators.location_textbox).type(' ');

                base.log('Perform the search by clicking button');
                cy.get(locators.location_textbox)
                    .next()
                    .get(locators.autoCompleteItems)
                    .its('length')
                    .should('be.gte', 0);
            }
        );
    });
});
