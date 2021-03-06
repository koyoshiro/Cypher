![image](https://img.shields.io/badge/language-Javascript-orange.svg) ![image](https://img.shields.io/badge/npm-v1.0.6-blue.svg) ![image](https://travis-ci.org/koyoshiro/Cypher.svg?branch=master)

# Introduction
Msg formatting tool for git-commit based on Commitizen.

And you could check your committing files when pre-commit.

# Installation

1. edit package.json.

```js
"scripts": {
        "commitmsg": "validate-commit-msg",
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
        "version": "npm run changelog && git add CHANGELOG.md"
    },
"devDependencies": {
        "@vanir/gjallar": "^1.0.9"
    },
"husky": {
    "hooks": {
        "pre-commit": "lint-staged"  // if you want to use git-hook
        }
    },
"config": {
    "commitizen": {
        "path": "node_modules/@vanir/gjallar"
        }
    }
```

2. install or update cypher.

```js
npm install
```

3. create file`.lintstagedrc.json`in `./` and add it.

```js
{
    "src/*.js": [
        "prettier --write", // if use prettier
        "tsc",  // if use typescript
        "commitmsg",
        "git add"
        // able to add some commands,like jest
        ]
}
```

4. if you want to use prettier, should create file`.prettierrc`in `./` and add it.

```js
{
    "tabWidth": 4,
    "singleQuote": true,
    "semi": true,
    "printWidth": 120
}
```


# Todo List

## pre-commit check

- [X] husky
- [X] commit-lint
- [X] lint-stage
- [X] prettier
- [ ] TSLint/ESLint

## multi-language

- [X] Chinese Language Config
- [X] English Language Config
