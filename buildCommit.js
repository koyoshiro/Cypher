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
                        result = result.replace(new RegExp(item, "g"), "\\\\`");
                });
                return result;
        }

        function generateBody(answers) {
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
                var bodyTitle = `[机票 V${answers.version}] ${commitTypeName} ${commitCode} \n`;
                return bodyTitle;
        }

        var head = '';
        if(answers.scope){
                head = `${answers.type}(${answers.scope}): ${addSubject(answers.subject)}\n`; 
        }else{
                head = `${answers.type}: ${addSubject(answers.subject)}\n`; 
        } 

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions) || "";
        body = body.split("|").join("\n");

        var result = head;
        if (body) {
                result += `\n ${generateBody(answers)} \n ${body}`;
        }
        return escapeSpecialChars(result);
};
