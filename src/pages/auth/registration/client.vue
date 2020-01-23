<template>
  <div class="client-registration">
    <div class="input__wrapper">
      <mf-input
          :placeholder="'Номер Вашего мобильного телефона'"
          :value.sync="credentials.phone"
          :type="'tel'"
          :error="inputErrors.phone"
          mask="+7 (999) 999-99-99"
      ></mf-input>
      <mf-input
          :placeholder="'E-mail адрес'"
          :value.sync="credentials.email"
          :type="'email'"
          :error="inputErrors.email"
      ></mf-input>
      <mf-select v-model="credentials.company" placeholder="Наименование организации"
                 :error="inputErrors.company"
                 :options="companies" :loading="loading.companies" option-name="name"></mf-select>
      <mf-input
          :placeholder="'Имя'"
          :value.sync="credentials.firstName"
          :error="inputErrors.firstName"
      ></mf-input>
      <mf-input
          :placeholder="'Фамилия'"
          :value.sync="credentials.surname"
          :error="inputErrors.surname"
      ></mf-input>
      <mf-input
          :placeholder="'Отчество'"
          :value.sync="credentials.patronymic"
          :error="inputErrors.patronymic"
      ></mf-input>
      <mf-input
          :placeholder="'Пароль'"
          :value.sync="credentials.password"
          :error="inputErrors.password"
          :type="'password'"
      ></mf-input>
      <mf-input
          :placeholder="'Повторите пароль'"
          :value.sync="credentials.passwordRepeat"
          :error="inputErrors.passwordRepeat"
          :type="'password'"
      ></mf-input>
    </div>
    <mf-button
        :disabled="!inputsValid"
        @click.native="registration"
    >Отправить
    </mf-button>
  </div>
</template>

<script>
  import Api from '../../../services/api/modules/customer'
  export default {
    name: "client",
    computed: {
      inputsValid() {
        console.log('working')
        let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let phoneRegexp = /^\+7 \([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}$/
        console.log(
          emailRegexp.test(this.credentials.email),
          phoneRegexp.test(this.credentials.phone),
          this.credentials.company !== null,
          this.credentials.password.length > 0,
          this.credentials.passwordRepeat.length > 0,
          this.credentials.firstName.length > 0,
          this.credentials.surname.length > 0,
          this.credentials.patronymic.length > 0)
        return (
          emailRegexp.test(this.credentials.email) &&
          phoneRegexp.test(this.credentials.phone) &&
          this.credentials.company !== null &&
          this.credentials.password.length > 0 &&
          this.credentials.passwordRepeat.length > 0 &&
          this.credentials.firstName.length > 0 &&
          this.credentials.surname.length > 0 &&
          this.credentials.patronymic.length > 0
        )
      }
    },
    data() {
      return {
        loading:{
          companies: true,
          login: false
        },
        companies: [],
        credentials: {
          phone: null,
          email: null,
          password: '',
          passwordRepeat: '',
          firstName: '',
          surname: '',
          patronymic: '',
          company: null
        },
        inputErrors: {
          phone: null,
          email: null,
          password: null,
          passwordRepeat: null,
          firstName: null,
          surname: null,
          patronymic: null,
          company: null
        }
      }
    },
    methods: {
      loadCompanies () {
        Api.getCompanies()
          .then((response) => {
            this.companies = response.companies.map(company => ({
              id: company.id,
              name: company.name
            }))
            this.loading.companies = false
          })
          .catch()
      },
      registration() {
        if (!this.inputsValid || this.loading.registration) {
          return
        }
        this.loading.login = true
        Api.registration({
          "email": this.credentials.email,
          "password": this.credentials.password,
          "passwordRepeat": this.credentials.passwordRepeat,
          "phone": this.credentials.phone,
          "first_name": this.credentials.firstName,
          "second_name": this.credentials.surname,
          "last_name": this.credentials.patronymic,
          "company_id": this.credentials.company.id
        }).then(data => {
          console.log(data)
          if (data.email !== undefined && !Array.isArray(data.email)) {
            console.log('aga')
            this.loading.login = false
            this.$f7.dialog.alert('Вы зарегистрированы','Успешно')
            this.$f7router.navigate('/auth')
          } else {
            this.responseErrorHelper(data, 'email', 'email', this.inputErrors)
            this.responseErrorHelper(data, 'phone', 'phone', this.inputErrors)
            this.responseErrorHelper(data, 'password', 'password', this.inputErrors)
            this.responseErrorHelper(data, 'passwordRepeat', 'passwordRepeat', this.inputErrors)
            this.responseErrorHelper(data, 'first_name', 'firstName', this.inputErrors)
            this.responseErrorHelper(data, 'second_name', 'surname', this.inputErrors)
            this.responseErrorHelper(data, 'last_name', 'patronymic', this.inputErrors)
            this.responseErrorHelper(data, 'company_id', 'company', this.inputErrors)
            this.loading.login = false
          }
        })
      }
    },
    mounted() {
      this.loadCompanies()
    },
    watch: {
      'loading.login': {
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

<style scoped lang="scss">
  @import "registration";
  .client-registration{
    margin-bottom:20px;
  }
</style>
