module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
