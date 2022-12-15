describe('Filters Suite', function () {
    Cypress.env().executionPlatforms.forEach((executionPlatform) => {
        it(
            'Distance Filter ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
                known_bug: 'CCM-280',
            },
            () => {
                base.log('Query with keyword and location');
                cy.get(locators.keyword_textbox).type(query_keyword);
                cy.get(locators.location_textbox).type(query_city + '{enter}');

                base.log('Check Default Radius');
                cy.get(locators.distance_filterButton)
                    .click()
                    .invoke('text')
                    .should('contain', '25');

                base.log('Iterate over all radius');
                cy.wrap(0).as('prevCount');
                cy.get(locators.distance_filter)
                    .next(locators.filters)
                    .find('a')
                    .then((filterItems) => {
                        for (let i = 0; i <= filterItems.length - 1; i += 1) {
                            cy.get(locators.distance_filter)
                                .next(locators.filters)
                                .find('a')
                                .eq(i)
                                .click();
                            base.checkTotalResultsCount();
                            cy.get('@prevCount').then((prevCount) => {
                                cy.get('@totalResultsCount').should(
                                    'be.gte',
                                    prevCount
                                );
                                cy.get('@totalResultsCount').as('prevCount');
                            });
                            cy.get(locators.distance_filterButton).click();
                        }
                    });
            }
        );

        it(
            'Post Time Filter ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Query with keyword and location');
                cy.get(locators.keyword_textbox).type(query_keyword);
                cy.get(locators.location_textbox).type(query_city + '{enter}');

                base.log('Iterate over all times');
                cy.wrap(0).as('prevCount');
                if (executionPlatform === 'mobile') {
                    cy.get(locators.showFilters).click();
                }
                cy.get(locators.posttime_filterButton).click();
                cy.get(locators.posttime_filter)
                    .next(locators.filters)
                    .find('a')
                    .then((filterItems) => {
                        for (let i = 0; i <= filterItems.length - 1; i += 1) {
                            cy.get(locators.posttime_filter)
                                .next(locators.filters)
                                .find('a')
                                .eq((i + 2) % filterItems.length)
                                .click();
                            base.checkTotalResultsCount();
                            cy.get('@prevCount').then((prevCount) => {
                                cy.get('@totalResultsCount').should(
                                    'be.gte',
                                    prevCount
                                );
                                cy.get('@totalResultsCount').as('prevCount');
                            });
                            if (executionPlatform === 'mobile') {
                                cy.get(locators.showFilters).click();
                            }
                            cy.get(locators.posttime_filterButton).click();
                        }
                    });
            }
        );

        it(
            'Minimum Pay Filter ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
            },
            () => {
                base.log('Query with keyword and location');
                cy.get(locators.keyword_textbox).type(query_keyword);
                cy.get(locators.location_textbox).type(query_city + '{enter}');
                base.checkTotalResultsCount();
                cy.get('@totalResultsCount').as('initialCount');

                base.log('Iterate over all pay levels');
                cy.get('@totalResultsCount').as('prevCount');
                if (executionPlatform === 'mobile') {
                    cy.get(locators.showFilters).click();
                }
                cy.get(locators.minpay_filterButton).click();
                cy.get(locators.minpay_filter)
                    .next(locators.filters)
                    .find('a')
                    .then((filterItems) => {
                        for (let i = 0; i <= filterItems.length - 2; i += 1) {
                            cy.get(locators.minpay_filter)
                                .next(locators.filters)
                                .find('a')
                                .eq(i)
                                .click();
                            base.checkTotalResultsCount();
                            cy.get('@prevCount').then((prevCount) => {
                                cy.get('@totalResultsCount').should(
                                    'be.lte',
                                    prevCount
                                );
                                cy.get('@totalResultsCount').as('prevCount');
                            });
                            if (executionPlatform === 'mobile') {
                                cy.get(locators.showFilters).click();
                            }
                            cy.get(locators.minpay_filterButton).click();
                        }
                    });

                base.log('Clear filter');
                cy.get(locators.minpay_filter)
                    .next(locators.filters)
                    .find('a')
                    .last()
                    .click();
                base.checkTotalResultsCount();
                cy.get('@initialCount').then((initialCount) => {
                    cy.get('@totalResultsCount').should('eq', initialCount);
                });
            }
        );

        it(
            'Job Type Filter ' + executionPlatform,
            {
                execPlatform: executionPlatform,
                priority: 'smoke',
                known_bug: 'CCM-250',
            },
            () => {
                base.log('Query with keyword and location');
                cy.get(locators.keyword_textbox).type(query_keyword);
                cy.get(locators.location_textbox).type(query_city + '{enter}');
                base.checkTotalResultsCount();
                cy.get('@totalResultsCount').as('totalCount');

                base.log('Iterate over all job types');
                cy.get(locators.jobtype_filterButton).click();
                cy.get(locators.jobtype_filter)
                    .next(locators.filters)
                    .find('a')
                    .then((filterItems) => {
                        for (let i = 0; i <= filterItems.length - 2; i += 1) {
                            cy.get(locators.jobtype_filter)
                                .next(locators.filters)
                                .find('a')
                                .eq(i)
                                .then((filterItem) => {
                                    cy.wrap(filterItem)
                                        .invoke('text')
                                        .as('filteredCount_onButton');
                                    cy.wrap(filterItem).click();
                                });

                            base.checkTotalResultsCount();
                            cy.get('@totalResultsCount').then(
                                (filteredCount) => {
                                    cy.get('@totalCount').should(
                                        'be.gte',
                                        filteredCount
                                    );
                                    cy.get('@filteredCount_onButton').should(
                                        'be.eq',
                                        filteredCount
                                    );
                                }
                            );
                            cy.get(locators.jobtype_filterButton).click();
                        }
                    });

                base.log('Reset filter');
                cy.get(locators.jobtype_filter)
                    .next(locators.filters)
                    .find('a')
                    .last()
                    .then((filterItem) => {
                        cy.wrap(filterItem)
                            .invoke('text')
                            .as('filteredCount_onButton');
                        cy.wrap(filterItem).click();
                    });

                base.checkTotalResultsCount();
                cy.get('@totalResultsCount').then((filteredCount) => {
                    cy.get('@totalCount').should('be.eq', filteredCount);
                    /*cy.get('@filteredCount_onButton').should(
                            'be.eq',
                            filteredCount
                        );*/
                });
            }
        );
    });
});
