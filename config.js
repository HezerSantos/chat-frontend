const config = {
  production: {
    apiUrl: 'lunarlink-api.hallowedvisions.com',
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
