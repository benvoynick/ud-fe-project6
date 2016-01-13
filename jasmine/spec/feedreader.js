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
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Additional test: ensure we have a second feed to use in
         * New Feed Selection below
         */
        it('number at least two, allowing New feed selection test below', function() {
            expect(allFeeds.length).toBeGreaterThan(1);
        });

        /* Ensure that all feeds have a defined URL
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            for (var f = 0; f < allFeeds.length; f++) {
                expect(allFeeds[f].url).toBeDefined();
                expect(allFeeds[f].url.length).not.toBe(0);
            }
        });

        /* Ensure that all feeds have a defined name
         * and that the name is not empty.
         */
        it('have names', function() {
            for (var f = 0; f < allFeeds.length; f++) {
                expect(allFeeds[f].name).toBeDefined();
                expect(allFeeds[f].name.length).not.toBe(0);
            }
        });
    });

    /* Our second suite of tests ensures the menu's visibility code
     * is performing as expected.
     */
    describe('The menu', function() {
        var menuContainerClass = '.slide-menu';
        var menuIconClass = '.menu-icon-link';
        
        /* A hidden menu should be positioned far enough to the left
         * that none of it appears on screen.
         * This function tests if that is true.
         */
        function isMenuPositionedOffScreen() {
			var $menu = $(menuContainerClass);
            var menuWidth = $menu.outerWidth();
            if ($menu.offset().left + menuWidth <= 0) return true;
			else return false;
		}

        /* Ensure the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect(isMenuPositionedOffScreen()).toBe(true);
        });

         /* Ensure the menu changes visibility when the menu icon is clicked.
          * This test clicks the menu twice, testing after each CSS transition
          * that the menu has the desired visibility.
          */
        it('opens and closes when its icon is clicked', function(done) {
            var $menuIcon = $(menuIconClass);
            var $menu = $(menuContainerClass);

            function testClose() {
				$menu.one('transitionend webkitTransitionEnd otransitionend oTransitionEnd', function() {
                    expect(isMenuPositionedOffScreen()).toBe(true);
                    done();
                });
                $menuIcon.click();
			}

            function testOpen() {
                $menu.one('transitionend webkitTransitionEnd otransitionend oTransitionEnd', function() {
                    expect(isMenuPositionedOffScreen()).toBe(false);
                    testClose();
                });
                $menuIcon.click();
			}

            testOpen();
        })
    });

    describe('Initial entries', function() {
        /* Ensure that when the loadFeed function is called, it loads at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('are loaded in to the DOM', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New feed selection', function() {
        /* Ensure that when a new feed is loaded by the loadFeed function,
         * the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(1, done);
        });
        it('does change content in .feed', function(done) {
            var oldFeedContent = $('.feed').html();
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(oldFeedContent);
                done();
            });
        });
    });
}());
