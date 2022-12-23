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
                    base.visit(jobsEndpoint, [
                        keyword_identifier + '=' + query_keyword,
                        sorting_by_newest_identifier,
                        'pn' + '=' + pages,
                    ]);
                    cy.get(locators.jds)
                        .find(locators.timeStamp)
                        .last()
                        .invoke('text')
                        .then((last_timestamp) => {
                            cy.get('@first_timestamp').then(
                                (first_timestamp) => {
                                    let ft = 0;
                                    let lt = 0;
                                    if (
                                        first_timestamp === 'a day ago' ||
                                        first_timestamp === 'vor 1 Tag'
                                    ) {
                                        ft = 1;
                                    } else {
                                        ft = parseInt(first_timestamp);
                                    }
                                    if (
                                        last_timestamp === 'a day ago' ||
                                        last_timestamp === 'vor 1 Tag'
                                    ) {
                                        lt = 1;
                                    } else {
                                        lt = parseInt(last_timestamp);
                                    }

                                    expect(lt).to.be.at.least(ft);
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
