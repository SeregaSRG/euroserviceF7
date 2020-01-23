<template>
  <f7-page name="auth-login-client" bg-color="white">
    <div class="auth">
      <div class="auth__inputs">
        <mf-navbar
            v-if="loginType === 'client'"
            :title="'Вход заказчика'"
        ></mf-navbar>
        <mf-navbar
            v-if="loginType === 'executor'"
            :title="'Вход подрядчика'"
        ></mf-navbar>
        <div class="input__wrapper">
          <mf-input
              :placeholder="'E-mail адрес'"
              :value.sync="credentials.email"
              :error="inputErrors.email"
              @change="onLoginChange"
          ></mf-input>
          <mf-input
              :placeholder="'Пароль'"
              :value.sync="credentials.password"
              :type="'password'"
              :error="inputErrors.password"
          ></mf-input>
        </div>
        <mf-error :message="loginError.message" :show="loginError.status"></mf-error>
      </div>
      <div class="auth__button">
        <mf-button
            :action="login"
            :disabled="!inputsValid"
        >Отправить
        </mf-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
  import Api from '../../services/api'

  export default {
    name: "client",
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        loginError: {
          status: false,
          message: 'Неправильно введен логин или пароль.\n' + 'Проверьте правильность набора'
        },
        inputErrors: {
          email: null,
          password: null
        },
        loginLoading: false
      }
    },
    computed: {
      inputsValid () {
        let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return (emailRegexp.test(this.credentials.email) && this.credentials.password.length !== 0)
      }
    },
    props: {
      loginType: {
        type: String,
        default: 'client'
      }
    },
    methods: {
      onLoginChange() {
        this.credentials.password = ''
      },
      input() {
        this.inputsValid = true
        if (this.credentials.email.length < 1) {
          this.inputsValid = false
        }
        if (this.credentials.password.length < 1) {
          this.inputsValid = false
        }
      },
      login() {
        this.loginError.status = false
        this.loginLoading = true
        let credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }

        let success = (data, authCallBack) => {
          if (typeof data.bearerToken !== 'undefined') {
            authCallBack(data.bearerToken)
          } else if (typeof data.error !== 'undefined') {
            this.loginError.status = true
            this.loginError.message = data.error.message
          }
          this.responseErrorHelper(data, 'email', 'email', this.inputErrors)
          this.responseErrorHelper(data, 'password', 'password', this.inputErrors)
        }

        let loginPromise = null

        if (this.loginType === 'client') {
          loginPromise = new Promise((resolve, reject) => {
            Api.customer.login(credentials)
                .then(response => {
                  console.log(response)
                  success(response, (token) => {
                    this.$store.dispatch('auth/setAuthCustomer', {
                      token: token
                    })
                    this.$store.dispatch('customer/getProfile').then(() => {
                    })
                    this.$f7router.navigate('/')
                  })
                  resolve()
                })
          })
        } else {
          loginPromise = new Promise((resolve, reject) => {
            Api.employee.login(credentials)
                .then(response => {
                  success(response, (token) => {
                    this.$store.dispatch('auth/setAuthEmployee', {
                      token: token
                    })
                    this.$store.dispatch('employee/getProfile').then(() => {
                    })
                    this.$f7router.navigate('/')
                  })
                  resolve()
                })
          })
        }
        loginPromise.then(() => {
          this.loginLoading = false
        })
      }
    },
    watch: {
      loginLoading: {
        handler(to, from) {
          if (to) {
            this.$f7.dialog.preloader('Подождите')
          } else {
            this.$f7.dialog.close()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../css/auth/experimental-auth';
</style>
