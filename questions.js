'use strict';

var buildCommit = require('./buildCommit');

module.exports = {
    getQuestions: function(config,language) {
        // normalize config optional options
        var messages = {type,scope,subject,version,body,confirmCommit} =language

        const TagChoiceArray = Object.keys(config.types.typeList).map(function(key) {
            return {
                name: `${config.types.typeList[key].title}(${config.types.typeList[key].description})`,
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
                    console.log('\n' + SEP + '\n' + buildCommit(answers, config) + '\n' + SEP + '\n');
                    return messages.confirmCommit;
                }
            }
        ];

        return questions;
    }
};
