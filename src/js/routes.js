import hello from '../pages/hello.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import auth from '../pages/authMain.vue';
import authUser from '../pages/auth/user.vue';
import registration from '../pages/auth/registration.vue';
import authLogin from '../pages/auth/login';
import Workspace from '../pages/workspace';
import customerBidsList from '../pages/customer/bidsList'
import employeeBidsList from '../pages/employee/bidsList'
import createOrder from '../pages/customer/createOrder'
import Settings from '../pages/settings'
import customerBid from '../pages/customer/bid'
import employeeBid from '../pages/employee/bid'
import store from '../store'
import employeeReport from '../pages/employee/report'

import NotFoundPage from '../pages/404.vue';

let routes = [
  {
    path: '/',
    async (routeTo, routeFrom, resolve, reject) {
      console.log(store.state.auth.auth.loginState)
      if (store.state.auth.auth.loginState) {
        if (store.state.auth.auth.type === 'customer') {
          resolve({
            component: customerBidsList,
          })
        } else if (store.state.auth.auth.type === 'employee') {
          resolve({
            component: employeeBidsList,
          })
        }
      } else {
        resolve({
          component: hello,
        }, {
          reloadAll: true,
          reloadCurrent: true,
          ignoreCache: true
        })
      }
    }
  },
  {
    path: '/archive',
    async (routeTo, routeFrom, resolve, reject) {
      if (store.state.auth.auth.loginState) {
        if (store.state.auth.auth.type === 'customer') {
          resolve({
            component: customerBidsList,
          }, {
            props: {
              archive: true
            }
          })
        } else if (store.state.auth.auth.type === 'employee') {
          resolve({
            component: employeeBidsList,
          }, {
            props: {
              archive: true
            }
          })
        }
      }
    }
  },
  {
    path: '/new',
    async (routeTo, routeFrom, resolve, reject) {
      if (store.state.auth.auth.loginState) {
        if (store.state.auth.auth.type === 'employee') {
          resolve({
            component: employeeBidsList,
          }, {
            props: {
              openBids: true
            }
          })
        }
      }
    }
  },
  {
    path: '/bid/:bidId',
    async (routeTo, routeFrom, resolve, reject) {
      if (store.state.auth.auth.loginState) {
        if (store.state.auth.auth.type === 'customer') {
          resolve({
            component: customerBid,
          })
        } else if (store.state.auth.auth.type === 'employee') {
          resolve({
            component: employeeBid,
          })
        }
      }
    }
  },
  {
    path: '/report',
    async (routeTo, routeFrom, resolve, reject) {
      if (store.state.auth.auth.loginState) {
        if (store.state.auth.auth.type === 'employee') {
          resolve({
            component: employeeReport,
          })
        }
      }
    }
  },
  {
    path: '/auth',
    component: auth,
    options: {
      clearPreviousHistory: true,
      animate: true
    }
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/customer/create-order',
    component: createOrder,
  },
  {
    path: '/auth/login/client',
    component: authLogin,
    options: {
      props: {
        loginType: 'client'
      }
    }
  },
  {
    path: '/auth/login/executor',
    component: authLogin,
    options: {
      props: {
        loginType: 'executor'
      }
    }
  },
  {
    path: '/auth/registration',
    component: registration,
  },
  {
    path: '/auth/user',
    component: authUser,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/workspace/',
    component: Workspace,
    options: {
      clearPreviousHistory: true
    }
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
