'use strict';

var wrap = require('word-wrap');

module.exports = function buildCommit(answers, config) {
    var maxLineWidth = 100;

    var wrapOptions = {
        trim: true,
        newline: '\n',
        indent: '',
        width: maxLineWidth
    };

    function addSubject(subject) {
        return subject.trim();
    }

    function escapeSpecialChars(result) {
        var specialChars = ['`'];

        specialChars.map(function(item) {
            result = result.replace(new RegExp(item, 'g'), '\\\\`');
        });
        return result;
    }

    function generateKeyInfo(answers) {
        var bodyTitle = `Scope Version:${answers.version} \n Scope:${answers.scope} \n`;
        return bodyTitle;
    }

    var head = `${answers.type}: ${addSubject(answers.subject)}\n`;

    // Wrap these lines at 100 characters
    var body = wrap(answers.body, wrapOptions) || '';
    body = body.split('|').join('\n');

    var result = head;
    if (body) {
        result += `\n ${generateKeyInfo(answers)} \n ${body}`;
    }
    return escapeSpecialChars(result);
};
