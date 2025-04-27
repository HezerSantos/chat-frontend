const config = {
  production: {
    apiUrl: import.meta.env.API_URL,
  },
  development: {
    apiUrl: 'http://localhost:8080',
  },
}

const currentConfig =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? config.production
    : config.development

export default currentConfig.apiUrl
