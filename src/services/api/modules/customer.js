import Network from '../network.js'

export default {
  login(request) {
    return Network.post('customer/v1/login', request)
  },
  getProfile(request) {
    return Network.get('customer/v1/profile', request, true)
  },
  getCategories(request) {
    return Network.get('customer/v1/category', request, true)
  },
  createBid(request) {
    return Network.post('customer/v1/bid', request, true)
  },
  getBids(request) {
    return Network.get('customer/v1/bid', request, true)
  },
  getBid(request) {
    return Network.get('customer/v1/bid/' + request.bidId, request, true)
  },
  acceptBid(request) {
    return Network.put('customer/v1/bid/approve/' + request.bidId, {approve: request.status}, true)
  },
  getWorks(request) {
    return Network.get('customer/v1/work', request, true)
  },
  getCompanies() {
    return Network.get('customer/v1/company')
  },
  registration(request) {
    return Network.post('customer/v1/register', request)
  },
  getWorksList(request) {
    return Network.post('customer/v1/category/all-works', request)
  }
}
