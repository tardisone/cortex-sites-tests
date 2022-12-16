describe('Sorting Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Sorting ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Query with keyword');
                cy.get(locators.keyword_textbox).type(
                    query_keyword + '{enter}'
                );

                base.log('Sort by newest');
                cy.get(locators.sortByNewestButton).click();
                cy.get(locators.sortByNewestButton)
                    .find('span')
                    .should('have.class', 'active');
                cy.get(locators.sortByRelevanceButton)
                    .find('span')
                    .should('not.have.class', 'active');

                base.log('Read post date of first JD');
                cy.get(locators.jds)
                    .find(locators.timeStamp)
                    .eq(0)
                    .invoke('text')
                    .as('first_timestamp');

                base.log('Read post date of the last JD');
                base.checkTotalPageCount();
                cy.get('@totalPageCount').then((pages) => {
                    cy.visit(
                        baseUrl +
                            jobsEndpoint +
                            keyword_identifier +
                            '=' +
                            query_keyword +
                            '&pn=' +
                            pages
                    );
                    cy.get(locators.jds)
                        .find(locators.timeStamp)
                        .last()
                        .invoke('text')
                        .then((last_timestamp) => {
                            cy.get('@first_timestamp').then(
                                (first_timestamp) => {
                                    let ft = 0;
                                    if (first_timestamp === 'a day ago') {
                                        ft = 1;
                                    } else {
                                        ft = parseInt(first_timestamp);
                                    }
                                    expect(
                                        parseInt(last_timestamp)
                                    ).to.be.at.least(ft);
                                }
                            );
                        });
                });

                base.log('Sort by relevance');
                cy.get(locators.sortByRelevanceButton).click();
                cy.get(locators.sortByRelevanceButton)
                    .find('span')
                    .should('have.class', 'active');
                cy.get(locators.sortByNewestButton)
                    .find('span')
                    .should('not.have.class', 'active');
            }
        );
    });
});
