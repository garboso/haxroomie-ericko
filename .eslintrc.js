module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true
  },
  'globals': {
    '__dirname': 'readonly',
    'process': 'readonly',
    'HBInit': 'readonly'
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
