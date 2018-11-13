# Introduction

Msg formatting tool for git-commit based on Commitizen.

# Installation

package.json File

```js
"devDependencies": {
        "cypher": "git+https://github.com/koyoshiro/Cypher.git#master"
    },
"config": {
        "commitizen": {
            "path": "node_modules/cypher"
        }
    }    
```
then
```js
npm install
```
use command
```js
git cz
```

# Examples
![img](https://ws1.sinaimg.cn/large/006tNbRwly1fx6hqp7yfbj30v40ruwoc.jpg)

# Todo List
- [ ] support custom question
- [ ] npm package