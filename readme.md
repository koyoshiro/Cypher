![image](https://img.shields.io/badge/language-Javascript-orange.svg)   ![image](https://img.shields.io/badge/npm-v1.0.6-blue.svg)
# Introduction

Msg formatting tool for git-commit based on Commitizen.

# Installation

1. install necessary dependencies
```js
npm install -g commitizen conventional-changelog-cli  husky validate-commit-msg 
```

2. edit package.json
```js
"scripts": {
        "commitmsg": "validate-commit-msg",
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
        "version": "npm run changelog && git add CHANGELOG.md"
    },
"devDependencies": {
        "kyr-cypher": "^1.0.2"
    },
"config": {
        "commitizen": {
           "path": "node_modules/kyr-cypher"
        }
    }    
```

3. install or update cypher
```js
npm install
```

# Examples
![img](https://ws3.sinaimg.cn/large/006tNbRwly1fxftybrhsqj30zm0pwdpc.jpg)

# Todo List
- [x] npm package publish
- [ ] changelog custom
- [ ] comment custom
- [ ] verify file size