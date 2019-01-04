module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    // 取消 console 的错误提示
    "rules": {
        "no-console": 0,
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}