module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
          '.tsx',
        ]
      }
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-prettier',
    'jest-dom',
  ],
  rules: {
    semi: 'off',
    'react/jsx-filename-extension': 
    [1,
      { extensions: 
        ['.ts', '.tsx']
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: [ '\.svg' ]
      }
    ],
    'arrow-parens': 'off',
    'no-console': 'off',
    'operator-linebreak': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 130,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        endOfLine: 'auto',
      }]
  },
};
