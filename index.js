var findConfig = require('find-config');
var path = require('path');
var questions = require('./questions');
var buildCommit = require('./buildCommit');
var CYPHER_CONFIG_NAME = '.cypher-config.js';

function readConfigFile() {
    // First try to find the .cz-config.js config file
    var czConfig = findConfig.require(CYPHER_CONFIG_NAME, { home: false });
    if (czConfig) {
        return czConfig;
    }

    // fallback to locating it using the config block in the nearest package.json
    var pkg = findConfig('package.json', { home: false });
    if (pkg) {
        var pkgDir = path.dirname(pkg);
        pkg = require(pkg);
        if (pkg.config && pkg.config['cypher'] && pkg.config['cypher'].config) {
            // resolve relative to discovered package.json
            var pkgPath = path.resolve(pkgDir, pkg.config['cypher'].config);
            console.info('>>> 正在使用项目中Package.json中的Cypher配置项: ', pkgPath);
            return require(pkgPath);
        } else {
            console.log(
                '无法加载Cypher配置项，请确认package.json中config.cypher.config是否配置完整,将使用默认配置运行'
            );
        }
    }
}

module.exports = {
    prompter: function(cz, commit) {
        // var config = {
        //     messages: {},
        //     types: {}
        // };
        //readConfigFile();

        // console.log('\n\n每行长度为100个字符。\n');
        var language = require('./language');
        // config.types = language.english.choices;

        cz.prompt(questions.getQuestions(language.english.choices,language.english)).then(function(answers) {
            if (answers.confirmCommit === 'yes') {
                commit(buildCommit(answers));
            } else {
                console.log('已取消提交。');
            }
        });
    }
};
