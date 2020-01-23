<template>
  <f7-page name="registration" bg-color="white">
    <div class="registration">
      <mf-navbar
          class="registration__navbar"
          :title="'Регистрация'"
      ></mf-navbar>
      <mf-tabbar
          class="registration__tabbar"
          :tabs="tabs"
      ></mf-tabbar>
    </div>
  </f7-page>
</template>

<script>
  import client from './registration/client'
  import executor from './registration/executor'

  export default {
    name: "registration",
    data() {
      return {
        tabs: [
          {
            name: 'Заказчик',
            page: client
          },
          {
            name: 'Исполнитель',
            page: executor
          }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
.registration{
    display:flex;
    flex-direction:column;
    height:100%;
    .registration__navbar{
        flex-shrink:0;
    }
    .registration__tabbar{
        min-height: 0;
        flex: 1;
    }
}
</style>
