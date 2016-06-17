var waiting = function (rootSelector, callback) {
    var el = document.querySelector(rootSelector);
    var $timeout = angular.element(el).injector().get('$timeout');
    // make sure that timeout is queued in angular pipeline which should make sure that digest cycle really ended
    $timeout(callback, 0);
};

exports.config = {
    directConnect: true,
    restartBrowserBetweenTests: true,
    getPageTimeout: 60000,
    
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {'args': ['--disable-extensions']}
    },
    baseUrl: 'https://www.angularjs.org/',
    
    /* replace jasmine with cucumber */
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    
    /* cucumber specs */
    specs: ['./tests/**/*.feature'],
    
    cucumberOpts: {
        require: [
            './tests/e2e/steps/support/env.js',
            './tests/**/*.hooks.js',
            './tests/**/*.steps.js'],
        /*tags: [
            "@runThis",
            "~@ignoreThis"
        ],*/
        format: 'pretty'
    },
    
    /* integrate reporter */ 
    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },
    
    plugins: [{
        inline: {
            waitForPromise: function() { 
                return browser.executeAsyncScript(waiting, browser.rootEl);
            }
        }
    }],
};
