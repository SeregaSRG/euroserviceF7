<template>
  <f7-page name="hello" bg-color="white">
    <f7-swiper pagination :init="true">
      <f7-swiper-slide>
        <div class="swiper-slide-content">
          <img class="image" src="../assets/onboarding/Artwork.png">
          <h2 class="title">Заявка на работы</h2>
          <p class="description">Размещение заявки
            на необходимый Вам тип работ</p>
          <a class="skip" @click="goToAuth">Пропустить</a>
        </div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div class="swiper-slide-content">
          <img class="image" src="../assets/onboarding/Art.png">
          <h2 class="title">Контроль процесса</h2>
          <p class="description">Мониторинг и контроль выполнения заказа на всех этапах</p>
          <a class="skip" @click="goToAuth">Пропустить</a>
        </div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div class="swiper-slide-content">
          <img class="image" src="../assets/onboarding/Artwork3.png">
          <h2 class="title">Заказ выполнен</h2>
          <p class="description">После выполнения заказа происходит проверка и принятие</p>
          <a class="skip" @click="goToAuth">Продолжить</a>
        </div>
      </f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>

<script>
  export default {
    methods: {
      goToAuth () {
        console.log('aga')
        this.$store.commit('auth/SET_UNBOARDING_SKIP')
        this.$f7router.navigate('/auth')
        this.$f7router.clearPreviousHistory()
      }
    }
  }
</script>

<style lang="scss">
  .swiper-slide-content {
    height: 530px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .image {
      width: 230px;
      height: 230px;
      margin-top: 75px;
    }

    .title {
      max-width: 300px;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 36px;
      /* identical to box height, or 180% */
      display: flex;
      align-items: center;
      text-align: center;
      color: #001B36;
      margin: 25px 0 0 0;
    }

    .description {
      max-width: 300px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      /* or 150% */
      display: flex;
      align-items: center;
      text-align: center;
      color: #001B36;
      margin: 0;
    }

    .skip {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 137% */
      display: flex;
      align-items: center;
      text-align: center;
      color: #BEC2CE;
      padding-top: 40px;
    }
  }
</style>
