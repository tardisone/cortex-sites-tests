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
                let expected_page;
                cy.get('@totalPageCount').then((pages) => {
                    //if (pages > 1) { How to ensure there are more than 1 page?
                    base.log(
                        'Previous page button does not exist in the first page'
                    );
                    cy.get(locators.prev_page).should('not.exist');

                    base.log('Navigate to next page');
                    cy.get(locators.next_page).click();
                    cy.wrap('2').then((expected_page) => {
                        cy.url().should('include', 'pn=' + expected_page);
                        cy.waitUntil(() =>
                            cy
                                .get(locators.current_page)
                                .invoke('text')
                                .should('be.eq', expected_page)
                        );
                    });

                    base.log('Navigate to previous page');
                    cy.get(locators.prev_page).click();
                    cy.wrap('1').then((expected_page) => {
                        cy.url().should('include', 'pn=' + expected_page);
                        cy.waitUntil(() =>
                            cy
                                .get(locators.current_page)
                                .invoke('text')
                                .should('be.eq', '1')
                        );
                    });

                    base.log('Navigate to last page');
                    cy.wrap(pages.toString()).then((expected_page) => {
                        base.visit(jobsEndpoint, [
                            keyword_identifier + '=' + query_keyword,
                            'pn' + '=' + expected_page,
                        ]);
                        cy.waitUntil(() =>
                            cy
                                .get(locators.current_page)
                                .invoke('text')
                                .should('be.eq', expected_page)
                        );
                    });

                    base.log(
                        'Next page button does not exist in the last page'
                    );
                    cy.get(locators.next_page).should('not.exist');

                    base.log('Navigate to previous page from the last');
                    cy.get(locators.prev_page).eq(0).click();
                    cy.wrap((pages - 1).toString()).then((expected_page) => {
                        cy.waitUntil(() =>
                            cy.url().should('include', 'pn=' + expected_page)
                        );

                        cy.get(locators.current_page)
                            .invoke('text')
                            .should('be.eq', expected_page);
                    });
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
                    base.visit(jobsEndpoint, [
                        keyword_identifier + '=' + query_keyword,
                        'pn' + '=' + '99999999999999',
                    ]);

                    cy.get(locators.next_page).should('not.exist');

                    base.log('Navigate to a minus page number');
                    cy.visit(baseUrl + 'jobs?q=' + query_keyword + '&pn=-1');
                    base.visit(jobsEndpoint, [
                        keyword_identifier + '=' + query_keyword,
                        'pn' + '=' + '-1',
                    ]);
                    cy.get(locators.next_page);
                    cy.get(locators.prev_page);

                    base.log('Navigate to a wrong format page number');
                    let expected_page = '1';
                    base.visit(jobsEndpoint, [
                        keyword_identifier + '=' + query_keyword,
                        'pn' + '=' + 'abcde',
                    ]);
                    cy.get(locators.current_page)
                        .invoke('text')
                        .should('be.eq', expected_page);
                    //}
                });
            }
        );
    });
});
