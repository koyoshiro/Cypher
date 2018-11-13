"use strict";

var wrap = require("word-wrap");

module.exports = function buildCommit(answers, config) {
        var maxLineWidth = 100;

        var wrapOptions = {
                trim: true,
                newline: "\n",
                indent: "",
                width: maxLineWidth
        };

        function addSubject(subject) {
                return subject.trim();
        }

        function escapeSpecialChars(result) {
                var specialChars = ["`"];

                specialChars.map(function(item) {
                        // For some strange reason, we have to pass additional '\' slash to commitizen. Total slashes are 4.
                        // If user types "feat: `string`", the commit preview should show "feat: `\\string\\`".
                        // Don't worry. The git log will be "feat: `string`"
                        result = result.replace(new RegExp(item, "g"), "\\\\`");
                });
                return result;
        }

        function generateHeader(answers) {
                var commitTypeName = config.types.typeList[answers.type].title;
                var commitCode = "";
                switch (answers.type) {
                        case "feat":
                                commitCode = answers.featID;
                                break;
                        case "fix":
                                commitCode = answers.fixID;
                                break;
                        default:
                                break;
                }
                var head = `[机票 V${
                        answers.version
                }] ${commitTypeName} ${commitCode} \n ${addSubject(answers.subject)}\n`;
                return head;
        }

        // Hard limit this line
        var head = generateHeader(answers);

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions) || "";
        body = body.split("|").join("\n");

        var result = head;
        if (body) {
                result += "\n" + body;
        }

        return escapeSpecialChars(result);
};
