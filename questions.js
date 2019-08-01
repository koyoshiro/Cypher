'use strict';

var buildCommit = require('./buildCommit');

module.exports = {
    getQuestions: function(choices, language) {
        // normalize config optional options
        var messages = {};
        messages.type = language.type;
        messages.scope = language.scope;
        messages.subject = language.subject;
        messages.version = language.version;
        messages.body = language.body;
        messages.confirmCommit = language.confirmCommit;

        const TagChoiceArray = Object.keys(choices).map(function(key) {
            return {
                name: `${choices[key].title}(${choices[key].description})`,
                value: key
            };
        });

        var questions = [
            {
                type: 'list',
                name: 'type',
                message: messages.type,
                choices: TagChoiceArray
            },
            {
                type: 'input',
                name: 'scope',
                message: messages.scope
            },
            {
                type: 'input',
                name: 'subject',
                message: messages.subject,
                validate: function(value) {
                    return !!value;
                },
                filter: function(value) {
                    return value.charAt(0).toLowerCase() + value.slice(1);
                }
            },
            {
                type: 'input',
                name: 'version',
                message: messages.version
            },
            {
                type: 'input',
                name: 'body',
                message: messages.body
            },
            {
                type: 'expand',
                name: 'confirmCommit',
                choices: [{ key: 'y', name: 'Yes', value: 'yes' }, { key: 'n', name: 'Abort commit', value: 'no' }],
                message: function(answers) {
                    var SEP = '###--------------------------------------------------------###';
                    console.log('\n' + SEP + '\n' + buildCommit(answers) + '\n' + SEP + '\n');
                    return messages.confirmCommit;
                }
            }
        ];

        return questions;
    }
};
