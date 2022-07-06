module.exports = {
  env: {
    // 指定想启用的环境
    browser: true,
    es2021: true
  },
  // 指定额外配置选项，如['airbnb'] 示使用 Airbnb 的linting 规则
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 设置规则插件
  plugins: ['vue'],
  // 定义拓展的及通过插件添加的所有规则
  rules: {}
}
