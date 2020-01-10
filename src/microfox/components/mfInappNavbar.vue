<template>
  <div class="mf-navbar">
    <div class="mf-navbar__back-button" v-if="!menuButton" @click="$f7router.back()">
      <img src="../src/navbar/back.svg" alt="" class="mf-navbar__back-button-image">
    </div>
    <div class="mf-navbar__menu-button panel-open" v-if="menuButton">
      <div class="menu-button__wrapper">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="mf-navbar__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "mf-inapp-navbar",
    props: {
      title: {
        type: String,
        require: true
      },
      menuButton: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .mf-navbar {
    flex-shrink: 0;
    width: 100%;
    height: 56px;
    position: relative;
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 3px 5px rgba(0, 27, 54, 0.15);

    &__back-button {
      position: absolute;
      left: 0;
      top: 0;
      width: 48px;
      display: flex;
      height: 100%;
      align-items: center;

      &-image {
        margin: auto;
        width: 16px;
      }
    }

    &__menu-button {
      width: 54px;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;

      .menu-button__wrapper {

        .line {
          width: 18px;
          height: 2px;
          background-color: #001B36;
          margin-bottom: 3px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

    }

    &__title {
      margin: auto;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      /* identical to box height, or 180% */
      display: flex;
      align-items: center;

      color: #001B36;
    }
  }
</style>
