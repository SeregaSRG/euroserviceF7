import axios from 'axios'
import store from '../../store'

let querystring = require('querystring')

const config = () => ({
  baseURL: 'https://cors-proxy.erosha.ga/https://api.i-as.ru',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})

const secureConfig = () => {
  if (!store.state.auth.auth.token) {
    console.log(store.state.auth.auth)
    throw new Error('No authorised')
  }
  let conf = new config()
  conf.headers.Authorization = "Bearer " + store.state.auth.auth.token
  return conf
}
//const HTTP = axios.create()

export default {
  post(url, body, secured) {
    let conf = null
    if (secured) {
      conf = secureConfig()
    } else {
      conf = config()
    }
    return new Promise((resolve, reject) => {
      axios.create(conf).post(url, JSON.stringify(body))
        .then(
          (response) => {
            resolve(response.data)
          }
        )
        .catch(
          () => {
            reject('connection error')
          }
        )
    })
  },
  get(url, body, secured) {
    let conf = null
    if (secured) {
      conf = secureConfig()
    } else {
      conf = config()
    }
    return new Promise((resolve, reject) => {
      axios.create(conf).get(url, {
        params: body
      })
        .then(
          (response) => {
            resolve(response.data)
          }
        )
        .catch(
          () => {
            reject('connection error')
          }
        )
    })
  },
  put(url, body, secured) {
    return new Promise((resolve, reject) => {
      let conf = null
      if (secured) {
        conf = secureConfig()
      } else {
        conf = config()
      }
      return axios.create(conf).put(url, JSON.stringify(body))
        .then(
          (response) => {
            resolve(response.data)
          }
        )
        .catch(
          () => {
            reject('connection error')
          }
        )
    })
  },
  delete(url, body, secured) {
    let conf = null
    if (secured) {
      conf = secureConfig()
    } else {
      conf = config()
    }
    return axios.create(conf).delete(url, {data: querystring.stringify(body)})
  }
}
