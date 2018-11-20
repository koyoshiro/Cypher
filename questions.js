'use strict';

var buildCommit = require('./buildCommit');


module.exports = {

  getQuestions: function(config) {

    // normalize config optional options
    var messages = config.messages || {};

    messages.type = messages.type || '修改类型，从以下选项中选择最符合的一项：\n';
    messages.featID = messages.featID || '需求号：\n';
    messages.fixID = messages.fixID || '修复编号（包括BugID、IssueID）：\n';
    messages.scope = messages.scope || '本次提交影响的范围(可选)：\n';
    messages.subject = messages.subject || '主题，简要描述本次提交的内容：\n';
    messages.version = messages.version || '版本号，当前app版本，例如（8.00，8.00.2）：\n';
    messages.body = messages.body || '本次提交主要内容 (可选). 使用 "|" 换行:\n';
    messages.confirmCommit = messages.confirmCommit || '是否确认提交内容?y/n';

    const TagChoiceArray = Object.keys(config.types.typeList).map(function (key) {
        return {
            name: config.types.typeList[key].title + '    ' + config.types.typeList[key].description,
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
        name: 'featID',
        message: messages.featID,
        when: function(answers){
            return answers.type === 'feat';
        }
      }, {
        type: 'input',
        name: 'fixID',
        message: messages.fixID,
        when: function(answers){
            return answers.type === 'fix';
        }
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
        choices: [
          { key: 'y', name: 'Yes', value: 'yes' },
          { key: 'n', name: 'Abort commit', value: 'no' }
        ],
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
