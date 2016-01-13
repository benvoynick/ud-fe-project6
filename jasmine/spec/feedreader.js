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

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
