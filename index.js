var findConfig = require("find-config");
var path = require("path");
var questions = require("./questions");
var buildCommit = require("./buildCommit");

function readConfigFile() {
        // First try to find the .cz-config.js config file
        var czConfig = findConfig.require(CZ_CONFIG_NAME, { home: false });
        if (czConfig) {
                return czConfig;
        }

        // fallback to locating it using the config block in the nearest package.json
        var pkg = findConfig("package.json", { home: false });
        if (pkg) {
                var pkgDir = path.dirname(pkg);
                pkg = require(pkg);
                if (
                        pkg.config &&
                        pkg.config["cz-customizable"] &&
                        pkg.config["cz-customizable"].config
                ) {
                        // resolve relative to discovered package.json
                        var pkgPath = path.resolve(
                                pkgDir,
                                pkg.config["cz-customizable"].config
                        );
                        console.info(
                                ">>> 正在使用项目中Package.json中的Cypher配置项: ",
                                pkgPath
                        );
                        return require(pkgPath);
                }
        }
}

module.exports = {
        prompter: function(cz, commit) {
                var config = readConfigFile();

                console.log("\n\n每行长度为100个字符。\n");

                cz.prompt(questions.getQuestions(config, cz)).then(function(
                        answers
                ) {
                        if (answers.confirmCommit === "yes") {
                                commit(buildCommit(answers, config));
                        } else {
                                console.log("已取消提交。");
                        }
                });
        }
};
