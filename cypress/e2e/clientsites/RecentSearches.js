describe('Recent Searches Suite', function () {
    function checkRecentSearches(expectedLabels) {
        base.log('Go back to main page');
        cy.get(locators.mainPageLogo).click();
        expectedLabels.forEach((expectedLabel) => {
            cy.get(locators.recentsearchesHeader)
                .next()
                .find(locators.recentsearches + expectedLabel);
        });
    }

    function prepareLocator(identifier, keyword) {
        if (identifier === 'query') {
            return globalThis.app === 'careesma' || globalThis.app === 'wowjobs'
                ? ':contains("' + query_keyword + ' jobs")'
                : ':contains("' + query_keyword + '")';
        } else {
            return globalThis.app === 'careesma' || globalThis.app === 'wowjobs'
                ? ':contains("jobs in ' + keyword + '")'
                : ':contains("' + keyword + '")';
        }
    }

    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Query Results  ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Initially no recent searches');
                let expectedLabels = [];
                cy.get(locators.recentsearchesHeader).should('not.exist');

                base.log('Query with keyword');
                cy.get(locators.keyword_textbox).type(
                    query_keyword + '{enter}'
                );
                expectedLabels.push(prepareLocator('query', query_keyword));
                checkRecentSearches(expectedLabels);

                base.log('Query with location');
                cy.get(locators.location_textbox).type(
                    query_location + '{enter}'
                );
                expectedLabels.push(prepareLocator('location', query_location));
                checkRecentSearches(expectedLabels);

                base.log('Query with keyword and location');
                cy.get(locators.keyword_textbox)
                    .type(query_keyword)
                    .get(locators.location_textbox)
                    .type(query_location + '{enter}');
                expectedLabels.push(
                    ':contains("' +
                        query_keyword +
                        ' jobs in ' +
                        query_location +
                        '")'
                );
                checkRecentSearches(expectedLabels);

                let maxRecentSearchNumber = 5;
                for (let i = 3; i < maxRecentSearchNumber + 2; i += 1) {
                    base.log('Query with keyword');
                    cy.get(locators.keyword_textbox).type(
                        query_keyword + i + '{enter}'
                    );
                    if (expectedLabels.length === 5) {
                        expectedLabels.shift();
                    }
                    expectedLabels.push(
                        prepareLocator('query', query_keyword + i)
                    );
                    checkRecentSearches(expectedLabels);
                }
            }
        );
    });
});
