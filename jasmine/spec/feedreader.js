/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Looping through each feed in the allFeeds object to ensure
         * it has a URL defined and that the URL is not empty.
         */
        it('have a defined URL, that is not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
            
        });


        /* Looping through each feed in the allFeeds object to ensure
         * it has a name defined and that the name is not empty.
         */
        it('have a name defined which is not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });

    });


    describe('The menu', () => {
        // menu element is hidden by default. 
        it('is hidden', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('displays/hides if clicked', () => {
            //menu icon is clicked first time
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            //menu icon is clicked second time
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', () => {
        
        /* when the loadFeed function is called and completes its
         * work, there is at least a single .entry element within 
         * the .feed container.
         */
        beforeEach(done => {
            loadFeed(0, done);
        });

        it('has at least a single entry', () => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', () => {
        var contentInitial, contentNew;

        /* when a new feed is loaded by the loadFeed function that 
         * the content actually changes.
         */
        it('changes content if new feed topic is chosen', (done) => {
            loadFeed(0, () => {
                //Content of .feed before selecting a new topic
                contentInitial = $('.feed').html();
                
                loadFeed(1, () => {
                contentNew = $('.feed').html();
                done();
                });
            });
            expect(contentInitial).not.toBe(contentNew);
        });
    });
}());
