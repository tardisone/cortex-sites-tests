describe('Pagination Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Pagination ' + executionPlatform,
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
                base.checkTotalPageCount();
                cy.get('@totalPageCount').then((pages) => {
                    //if (pages > 1) { How to ensure there are more than 1 page?
                    base.log(
                        'Previous page button does not exist in the first page'
                    );
                    cy.get(locators.prev_page).should('not.exist');

                    base.log('Navigate to next page');
                    let expected_page = '2';
                    cy.get(locators.next_page).click();
                    cy.url().should('include', 'pn=' + expected_page);
                    cy.wait(100);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);

                    base.log('Navigate to previous page');
                    expected_page = '1';
                    cy.get(locators.prev_page).click();
                    cy.url().should('include', 'pn=' + expected_page);
                    cy.wait(100);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);

                    base.log('Navigate to last page');
                    expected_page = pages.toString();
                    cy.visit(
                        baseUrl +
                            jobsEndpoint +
                            keyword_identifier +
                            '=' +
                            query_keyword +
                            '&pn=' +
                            expected_page
                    );
                    cy.wait(100);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);

                    base.log(
                        'Next page button does not exist in the last page'
                    );
                    cy.get(locators.next_page).should('not.exist');

                    base.log('Navigate to previous page from the last');
                    expected_page = (pages - 1).toString();
                    cy.get(locators.prev_page).eq(0).click();
                    cy.url().should('include', 'pn=' + expected_page);
                    cy.wait(100);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);
                    //}
                });
            }
        );

        it(
            'Pagination Negative Scenarios ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'coverage',
            },
            () => {
                base.log('Query with keyword');
                cy.get(locators.keyword_textbox).type(
                    query_keyword + '{enter}'
                );

                base.log('Check Results Count');
                base.checkTotalPageCount();
                cy.get('@totalPageCount').then((pages) => {
                    //if (pages > 1) {
                    base.log('Navigate to a too big page number');
                    cy.visit(
                        baseUrl +
                            'jobs?q=' +
                            query_keyword +
                            '&pn=99999999999999'
                    );
                    cy.wait(100);
                    cy.get(locators.next_page).should('not.exist');

                    base.log('Navigate to a minus page number');
                    cy.visit(baseUrl + 'jobs?q=' + query_keyword + '&pn=-1');
                    cy.wait(100);
                    cy.get(locators.next_page);
                    cy.get(locators.prev_page);

                    base.log('Navigate to a wrong format page number');
                    let expected_page = '1';
                    cy.visit(baseUrl + 'jobs?q=' + query_keyword + '&pn=abcde');
                    cy.wait(100);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);
                    //}
                });
            }
        );
    });
});
