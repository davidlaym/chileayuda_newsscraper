module.exports = {
  root: true,
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'nodejs',

  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'semi': [2,'never']
  }
}
