import { defineConfig } from 'vite'
import path from 'path'
import proxys from './config/proxys'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { EsLinter, linterPlugin, TypeScriptLinter } from 'vite-plugin-linter'
import ElementPlus from 'unplugin-element-plus/vite'

const { resolve } = path
const pathSrc = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    vueJsx(),
    ElementPlus(),
    linterPlugin({
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      linters: [
        new EsLinter({
          configEnv: configEnv,
          serveOptions: { clearCacheOnStart: true }
        }),
        new TypeScriptLinter()
      ],
      build: {
        includeMode: 'filesInFolder'
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '~': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use \'~/global.scss\' as *;'
      }
    }
  },
  server: {
    host: true,
    proxy: proxys[configEnv.mode]
  }
}))
