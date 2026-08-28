import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // 270p) Code Challenge - ESLint Custom 규칙
  {
    name: 'app/custom-rules',
    rules: {
      // 엄격한 비교 연산자(===) 사용을 강제
      eqeqeq: ['error', 'always'],
      // 개발 편의를 위해 console.log 허용
      'no-console': 'off',
    },
  },

  skipFormatting,
])
