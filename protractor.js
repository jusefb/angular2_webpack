require('ts-node').register();
var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
    consolidateAll: true,
    savePath: 'testresults',
    filePrefix: 'xmloutput'
});

// conf.js
exports.config = {
    baseUrl: 'http://127.0.0.1:3000/',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: './node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.0.jar',
    specs: ['client/_e2e_tests/specs/*.ts'],
    //chromeOnly: true,
    directConnect: true,
    //allScriptsTimeout: 110000,
    //getPageTimeout: 100000,
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions':{
            args: ['disable-web-security', 'disable-popup-blocking']
        },
        /*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         */
        //'phantomjs.binary.path': require('phantomjs').path,

        /*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         */
        //'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
    },
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        // At this point, global variable 'protractor' object will be set up, and
        // globals from the test framework will be available. For example, if you
        // are using Jasmine, you can add a reporter with:
         jasmine.getEnv().addReporter(junitReporter);
        //
        // If you need access back to the current configuration object,
        // use a pattern like the following:
        //     return browser.getProcessedConfig().then(function(config) {
        //       // config.capabilities is the CURRENT capability being run, if
        //       // you are using multiCapabilities.
        //       console.log('Executing capability', config.capabilities);
        //     });
        global.EC = protractor.ExpectedConditions;

        console.log(process.env.TS_NODE_PROJECT);
    },

    /**
     * ng2 related configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
}