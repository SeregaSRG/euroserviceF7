import Network from '../network.js'

export default {
  login (request) {
    return Network.post('employee/v1/login', request)
  },
  getProfile (request) {
    return Network.get('employee/v1/profile', request, true)
  },
  getBids(request) {
    return Network.get('employee/v1/bid', request, true)
  },
  getBid(request) {
    return Network.get('employee/v1/bid/' + request.bidId, request, true)
  },
  getOpenBids (request) {
    return Network.get('employee/v1/bid/search-all-open', request, true)
  },
  sendReport(request) {
    return Network.put('employee/v1/bid/done/' + request.bidId, request, true)
  },
  applyBid(request) {
    return Network.put('employee/v1/bid/apply/' + request.bidId, {apply: request.status}, true)
  },
}
