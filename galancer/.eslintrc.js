module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react-hooks', 'import', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'import/extensions': 0,
    'no-use-before-define': 0,
    'no-shadow': 'off',
    'react/prop-types': 0,
    'no-empty-pattern': 0,
    'no-alert': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
