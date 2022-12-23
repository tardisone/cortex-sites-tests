class Locators {
    keyword_textbox = 'input[id="query-input"]';
    location_textbox = 'input[id="location-input"]';
    searchButton = 'button[data-testid="findJobsSearchSubmit"]';
    searchErrorAlert = '[data-testid="findJobsSearchErrorAlert"]';
    autoCompleteItems = 'span[role="button"]';
    jobResultsHeadline = 'header h1.SerpH1-headline';
    jds = '[id="job-list"] article';
    sortByNewestButton = 'div.SortToggle [aria-label="Sort by newest"]';
    sortByRelevanceButton = 'div.SortToggle [aria-label="Sort by relevance"]';
    filters = '[role="presentation"]';
    showFilters = 'button.DesktopHeader-toggleFilters';
    distance_filter = '[data-testid="distanceFilterLabel"]';
    distance_filterButton = this.distance_filter + ' button';
    posttime_filter = '[data-testid="postedFilterLabel"]';
    posttime_filterButton = this.posttime_filter + ' button';
    minpay_filter = '[data-testid="minimumPayFilterLabel"]';
    minpay_filterButton =
        platform === 'desktop'
            ? this.minpay_filter + ' button'
            : '[data-testid="minimumPayFilter"]';

    jobtype_filter = '[data-testid="jobTypeFilterLabel"]';
    jobtype_filterButton = this.jobtype_filter + ' button';
    timeStamp = 'div.SerpJob-properties time';
    next_page = 'a.Pagination-link.Pagination-link--next';
    prev_page = 'a.Pagination-link.Pagination-link--prev';
    current_page =
        'span.Pagination-link.Pagination-link--nohover.Pagination-link--active';
    mainPageLogo = '[data-testid="headerLogo"]:visible';
    recentsearchesHeader =
        'h2:contains("' + globalThis.recentSearchHeader + '")';
    recentsearches = 'li a';
}

export default Locators;
