var findConfig = require("find-config");
var path = require("path");
var questions = require("./questions");
var buildCommit = require("./buildCommit");
var CYPHER_CONFIG_NAME = ".cypher-config.js";

function readConfigFile() {
        // First try to find the .cz-config.js config file
        var czConfig = findConfig.require(CYPHER_CONFIG_NAME, { home: false });
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
                        pkg.config["cypher"] &&
                        pkg.config["cypher"].config
                ) {
                        // resolve relative to discovered package.json
                        var pkgPath = path.resolve(
                                pkgDir,
                                pkg.config["cypher"].config
                        );
                        console.info(
                                ">>> 正在使用项目中Package.json中的Cypher配置项: ",
                                pkgPath
                        );
                        return require(pkgPath);
                } else {
                        console.log(
                                "无法加载Cypher配置项，请确认package.json中config.cypher.config是否配置完整,将使用默认配置运行"
                        );
                }
        }
}

var COMMIT_TYPE = {
        typeList: {
                feat: {
                        description: "    产品需求实现的一部分",
                        title: "需求"
                },
                fix: {
                        description: " bug修复",
                        title: "bug修复"
                },
                docs: {
                        description: "    添加/完善文档",
                        title: "文档"
                },
                refactor: {
                        description: "不为了实现新功能或修复已有bug的代码修改",
                        title: "代码重构"
                },
                test: {
                        description: "    添加新的测试用例或修改已有的测试用例",
                        title: "测试"
                },
                build: {
                        description: "    打包",
                        title: "打包"
                },
                revert: {
                        description: " Reverts一个过往的提交",
                        title: "Reverts"
                }
        }
};

module.exports = {
        prompter: function(cz, commit) {
                var config = {
                    messages:{},
                    types:{}
                };//readConfigFile();

                console.log("\n\n每行长度为100个字符。\n");

                config.types = COMMIT_TYPE;

                cz.prompt(questions.getQuestions(config)).then(
                        function(answers) {
                                if (answers.confirmCommit === "yes") {
                                        commit(buildCommit(answers, config));
                                } else {
                                        console.log("已取消提交。");
                                }
                        }
                );
        }
};
