import type { ProxyOptions } from 'vite'

interface proxyType {
  dev: Record<string, string | ProxyOptions>,
  test: Record<string, string | ProxyOptions>,
  pre: Record<string, string | ProxyOptions>,
}

const Proxys: proxyType = {
  dev: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  test: {
    '/api': {
      target: 'http://localhost:test',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  pre: {
    '/api': {
      target: 'http://localhost/pre',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}

export default Proxys
