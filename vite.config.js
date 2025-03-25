import {defineConfig, loadEnv, mergeConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  let viteConfig = {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue$': 'vue/dist/vue.esm.js',
        'fixtures': fileURLToPath(new URL('cypress/fixtures', import.meta.url))
    }
  },
    esbuild: {
      minify: true
    },
    plugins: [
      vue(),
      viteCommonjs(),
    ],
    static: {
      directory: path.resolve(__dirname, './src/assets'),
      publicPath: '/static',
    }
  }
  if (command === 'serve') {
    //dev specific config
    let devConfig = {
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
      watch: {
        usePolling: true,
        interval: 1000,
      }
    }
    return mergeConfig(viteConfig, devConfig)
  } else {
    //command === 'build'
    const prodConfig = {}
    return mergeConfig(viteConfig, prodConfig)
  }
})
