import type { ModuleTree } from 'vuex'
import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'
const files = import.meta.globEager('./**/*.vuex.ts')
const vuexModules: Record<string, ModuleTree<unknown>> = {}

Object.keys(files).forEach(key => {
  vuexModules[key.slice(2, -8)] = { ...files[key].default }
})

export default createStore({
  modules: {
    ...vuexModules
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
