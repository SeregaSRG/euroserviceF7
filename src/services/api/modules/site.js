import Network from '../network.js'

export default {
  suggestAddress (request) {
    return Network.get('site/suggest-address', request, true)
  },
  suggestCompanies (request) {
    return Network.get('site/suggest-company', request)
  }
}
