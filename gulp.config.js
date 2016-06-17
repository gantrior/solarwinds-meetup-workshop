module.exports = function () {
    
    var root = './';
    var tests = root + 'tests/';
    var e2edest = tests + 'e2e/';
    var config = {
        root: root,
        tests: tests,
        e2edest: e2edest,
        alljs: [
            // TODO add product files
            tests + '**/*.js'
        ],
        ts: [
            // TODO add product files
            tests + '**/*.ts'
        ],
        watchts: [
            // without '/' in the beginning, otherwise watch will not detect new files
            'tests/**/*.ts'
        ],
        tslint: [
            tests + '**/*.ts',
            '!' + tests + 'e2e/typings/**/*'
        ],
        htmlsources: [
            'src/**/*.html'
        ]
    };
    
    return config;
    
    ///////////////// FUNCTIONS
};