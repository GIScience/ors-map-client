import {defineConfig, loadEnv, mergeConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
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
        vue : '@vue/compat',
        'fixtures': fileURLToPath(new URL('cypress/fixtures', import.meta.url))
    }
  },
    esbuild: {
      minify: true
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      }),
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
    const prodConfig = {
      define: {
        // This is necessary in Vue 2 codebases. It is automatic in Vue 3
        __VUE_PROD_DEVTOOLS__: 'false',
      },
      rollupOptions: {

      },
      build: {
        // sourcemap: true,  // takes more time to build, turn off before committing
        minify: 'terser',
        terserOptions: {
          format: {
            comments: false
          }
        }
      }
    }
    return mergeConfig(viteConfig, prodConfig)
  }
})
