import {defineConfig, loadEnv, mergeConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import path from "path"
import { createHtmlPlugin } from "vite-plugin-html"

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  let viteConfig = {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          'vue$': 'vue/dist/vue.esm.js',
          'fixtures': fileURLToPath(new URL('cypress/fixtures', import.meta.url))
      }
    },
    plugins: [
      vue(),
      viteCommonjs(),
    ]
  }
  if (command === 'serve') {
    //dev specific config
    let devConfig = {
      define: {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      },
      esbuild: {
        minify: true
      },
      server: {
        host: 'localhost',
        port: 8080,
        open: false,
        hmr: true,
        compress: true,
        proxy: {},
        client: {
          logging: 'verbose',
          overlay: { warnings: false, errors: true },
        }
      },
      plugins: [
        createHtmlPlugin({
          filename: 'dev.html',
          template: 'dev.html',
        })
      ],
      watch: {
        usePolling: true,
        interval: 1000,
      },
      static: {
        directory: path.resolve(__dirname, './src/assets'),
        publicPath: '/static',
      }
    }
    return mergeConfig(viteConfig, devConfig)
  } else {
    //command === 'build'
    const prodConfig = {}
    return mergeConfig(viteConfig, prodConfig)
  }
})
