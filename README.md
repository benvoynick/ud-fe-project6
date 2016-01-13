# Feed Reader testing portfolio project - Ben Voynick

For this project, I wrote Jasmine tests for a pre-existing feed reader application.

## Running the Application

Open index.html in your web browser to run both the feed reader and the Jasmine tests. The tests should automatically run and display results at the bottom.

## Browser Requirements

The test that checks if the menu opens and closes when its icon is clicked assumes that your browser is capable of applying the CSS [transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) property AND of reporting the end of the transition via the [transitionend](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) event listener. If you are using an older browser that does not support these things, this test will fail.