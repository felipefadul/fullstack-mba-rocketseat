const DEV_URL = 'http://localhost:3333'
const PROD_URL = 'https://haircut-scheduling.vercel.app/api'

const isLocalEnvironment =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'

export const apiConfig = {
  baseURL: isLocalEnvironment ? DEV_URL : PROD_URL,
}
