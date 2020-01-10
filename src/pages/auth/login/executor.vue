<template>
  <f7-page name="auth-login-client" bg-color="white">
    <div class="auth">
      <div class="auth__inputs">
        <mf-navbar
            :title="'Вход подрядчика'"
        ></mf-navbar>
        <div class="input__wrapper">
          <mf-input
              :error="inputErrors.login"
              :placeholder="'E-mail адрес'"
              :value.sync="credentials.login"
          ></mf-input>
          <mf-input
              :error="inputErrors.password"
              :placeholder="'Пароль'"
              :value.sync="credentials.password"
              :type="'password'"
          ></mf-input>
        </div>
        <mf-error :message="loginError.message" :show="loginError.status"></mf-error>
      </div>
      <div class="auth__button">
        <mf-button
            :disabled="true"
        >Отправить
        </mf-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
  export default {
    name: "client",
    data() {
      return {
        credentials: {
          login: null,
          password: null
        },
        inputErrors: {
          login: null,
          password: null
        },
        loginError: {
          status: false,
          message: 'Неправильно введен логин или пароль.\n'+'Проверьте правильность набора'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../css/auth/experimental-auth';
</style>
