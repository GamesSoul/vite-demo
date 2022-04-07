'use strict';
/** @format */
module.exports = {
  root: true,
	plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-css-modules'
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  rules: {
    'scss/dollar-variable-pattern': null,
    // 搬运
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // webcomponent
    'selector-type-no-unknown': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
  }
}