<template>
  <div class="client-registration">
    <div class="input__wrapper">
      <mf-input
          :placeholder="'Номер Вашего мобильного телефона'"
          :value.sync="credentials.phone"
          :type="'tel'"
          :error="inputErrors.phone"
          mask="+7 (999) 999-99-99"
          :valid-condition="validPhone"
      ></mf-input>
      <mf-input
          :placeholder="'E-mail адрес'"
          :value.sync="credentials.email"
          :type="'email'"
          :error="inputErrors.email"
          :valid-condition="validEmail"
      ></mf-input>
      <mf-input-company
          @focus="inputErrors.company = ''"
          :error="inputErrors.company"
          :value.sync="credentials.company"
          :inn.sync="credentials.inn"
          :valid-condition="validCompany"
          placeholder="Наименование организации">
      </mf-input-company>
      <!--<mf-select v-model="credentials.company" placeholder="Наименование организации"
                 :error="inputErrors.company"
                 :options="companies" :loading="loading.companies" option-name="name"></mf-select>-->
      <mf-input
          :placeholder="'Имя'"
          :value.sync="credentials.firstName"
          :error="inputErrors.firstName"
          :valid-condition="validFirstName"
      ></mf-input>
      <mf-input
          :placeholder="'Фамилия'"
          :value.sync="credentials.surname"
          :error="inputErrors.surname"
          :valid-condition="validSurname"
      ></mf-input>
      <mf-input
          :placeholder="'Отчество'"
          :value.sync="credentials.patronymic"
          :error="inputErrors.patronymic"
      ></mf-input>
      <mf-input
          :placeholder="'Пароль (не менее 6 символов)'"
          :value.sync="credentials.password"
          :error="inputErrors.password"
          :type="'password'"
          :valid-condition="validPassword"
      ></mf-input>
      <mf-input
          :placeholder="'Повторите пароль'"
          :value.sync="credentials.passwordRepeat"
          :error="inputErrors.passwordRepeat"
          :type="'password'"
          :valid-condition="validRepeatPassword"
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
        return (
          this.validFirstName &&
          this.validSurname &&
          this.validEmail &&
          this.validPhone &&
          this.validCompany &&
          this.validPassword &&
          this.validRepeatPassword
        )
      },
      validFirstName() {
        return this.credentials.firstName.length !== 0
      },
      validSurname() {
        return this.credentials.surname.length !== 0
      },
      validEmail() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(this.credentials.email)
      },
      validPhone () {
        return /^\+7 \([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}$/.test(this.credentials.phone)
      },
      validCompany() {
        return this.credentials.company.length !== 0
      },
      validPassword() {
        return this.credentials.password.length > 6
      },
      validRepeatPassword() {
        return this.credentials.passwordRepeat.length !== 0 && this.credentials.password === this.credentials.passwordRepeat
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
          inn: '',
          company: ''
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
        let newPhone = this.credentials.phone
        Api.registration({
          "email": this.credentials.email,
          "password": this.credentials.password,
          "passwordRepeat": this.credentials.passwordRepeat,
          "phone": newPhone.slice(4,7)+newPhone.slice(9,12)+newPhone.slice(13,15)+newPhone.slice(16,18),
          "first_name": this.credentials.firstName,
          "second_name": this.credentials.patronymic,
          "last_name": this.credentials.surname,
          "inn": this.credentials.inn,
          "company_id": this.credentials.company
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
            this.responseErrorHelper(data, 'second_name', 'patronymic', this.inputErrors)
            this.responseErrorHelper(data, 'last_name', 'surname', this.inputErrors)
            this.responseErrorHelper(data, 'inn', 'company', this.inputErrors)
            this.responseErrorHelper(data, 'company_id', 'company', this.inputErrors)
            this.loading.login = false
          }
        })
          .catch((data) => {
            data = data.response.data
            this.responseErrorHelper(data, 'email', 'email', this.inputErrors)
            this.responseErrorHelper(data, 'phone', 'phone', this.inputErrors)
            this.responseErrorHelper(data, 'password', 'password', this.inputErrors)
            this.responseErrorHelper(data, 'passwordRepeat', 'passwordRepeat', this.inputErrors)
            this.responseErrorHelper(data, 'first_name', 'firstName', this.inputErrors)
            this.responseErrorHelper(data, 'second_name', 'patronymic', this.inputErrors)
            this.responseErrorHelper(data, 'last_name', 'surname', this.inputErrors)
            this.responseErrorHelper(data, 'inn', 'company', this.inputErrors)
            this.responseErrorHelper(data, 'company_id', 'company', this.inputErrors)
            this.loading.login = false
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
