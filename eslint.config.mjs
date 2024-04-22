// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
      // These rules are targeted at Vue.js 3.x.
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-for-template-key-on-child': ['error'],
      'no-useless-constructor': 'off',
    },
  },
)
