<template>
  <div class="client-side-panel">
    <div class="header">
      <div class="avatar">
        <img v-if="profile.photo" class="avatar__image" :src="profile.photo">
        <img v-else class="avatar__image" src="../../assets/side-panel/profile.svg">
      </div>
      <a href="/settings" class="panel-close">
        <div class="personal-data">
          <div class="personal-data__name">{{ fullName }}</div>
          <div class="personal-data__email">{{ email }}</div>
        </div>
      </a>
    </div>
    <div class="balance">
      <div class="balance__label">Баланс</div>
      <div class="balance__value">{{ profile.balance }} Р</div>
    </div>
    <div class="menu__container">
      <div class="menu">
        <a @click="changePage('/new')" class="panel-close" v-if="profileType === 'employee'">
          <div class="side-panel-button" :class="{ 'side-panel-button_selected': currentRoute === '/new' }">
            <div class="side-panel-button__icon">
              <img src="../../assets/side-panel/icons/orders.svg">
            </div>
            <div class="side-panel-button__label">Новые заявки</div>
          </div>
        </a>
        <a @click="changePage('/')" class="panel-close">
          <div class="side-panel-button" :class="{ 'side-panel-button_selected': currentRoute === '/' }">
            <div class="side-panel-button__icon">
              <img src="../../assets/side-panel/icons/orders.svg">
            </div>
            <div class="side-panel-button__label">Мои заявки</div>
          </div>
        </a>
        <a @click="changePage('/archive')" class="panel-close">
          <div class="side-panel-button" :class="{ 'side-panel-button_selected': currentRoute === '/archive' }">
            <div class="side-panel-button__icon">
              <img src="../../assets/side-panel/icons/archive.svg">
            </div>
            <div class="side-panel-button__label">Архив заявок</div>
          </div>
        </a>
        <div class="side-panel-button" :class="{ 'side-panel-button_selected': currentRoute === '/faq' }">
          <div class="side-panel-button__icon">
            <img src="../../assets/side-panel/icons/faq.svg">
          </div>
          <div class="side-panel-button__label">Вопросы и ответы</div>
        </div>
        <a href="/settings" class="panel-close">
          <div class="side-panel-button" :class="{ 'side-panel-button_selected': currentRoute === '/settings' }">
            <div class="side-panel-button__icon">
              <img src="../../assets/side-panel/icons/settings.svg">
            </div>
            <div class="side-panel-button__label">Настройки</div>
          </div>
        </a>
      </div>
      <a @click="logout" class="panel-close">
        <div class="logout">
          <div class="side-panel-button">
            <div class="side-panel-button__icon">
              <img src="../../assets/side-panel/icons/logout.svg">
            </div>
            <div class="side-panel-button__label">Выход</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Framework7Vue from 'framework7-vue';

  export default {
    name: "client",
    computed: {
      profile() {
        if (this.$store.state.auth.auth.type === 'customer') {
          return this.$store.state.customer.profile
        } else if (this.$store.state.auth.auth.type === 'employee') {
          return this.$store.state.employee.profile
        }
      },
      profileType() {
        return this.$store.state.auth.auth.type;
      },
      fullName() {
        return this.profile.firstName + ' ' + this.profile.lastName
      },
      email() {
        return this.profile.email
      },
      currentRoute() {
        return this.$f7.views.main.router.currentRoute.path
      }
    },
    mounted() {
      console.log(this.$f7.views.main.currentRoute)
    },
    methods: {
      changePage(path) {
        this.$f7.views.main.router.navigate(path, {
          reloadCurrent: true,
          ignoreCache: true,
        })
      },
      logout() {
        this.$f7.dialog.preloader('Подождите')
        setTimeout(() => {
          this.$f7.dialog.close()
          this.$store.dispatch('auth/logout')
          this.$f7.views.main.router.navigate('/', {
            reloadAll: true,
            clearPreviousHistory: true
          })
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .side-panel-button {
    width: 100%;
    display: flex;
    height: 48px;
    align-items: center;
    padding: 0 20px;
    opacity: 0.5;

    &.side-panel-button_selected {
      opacity: 1;
    }

    .side-panel-button__icon {
      width: 24px;
    }

    .side-panel-button__label {
      margin-left: 32px;
      font-size: 16px;
      line-height: 24px;
      color: #001B36;
    }
  }

  .client-side-panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Roboto, sans-serif;

    .header {
      width: 100%;
      background: #20BBFC;
      padding: 16px;
      flex-shrink: 0;

      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;

        .avatar__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .personal-data {
        margin-top: 10px;

        .personal-data__name {
          font-size: 18px;
          line-height: 20px;
          color: #FFFFFF;
        }

        .personal-data__email {
          font-size: 14px;
          line-height: 20px;
          color: #FFFFFF;
          margin-top: 7px;

        }
      }
    }

    .balance {
      background: #1792D8;
      padding: 20px 0 20px 72px;

      .balance__label {
        color: #FFFFFF;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .balance__value {
        font-weight: 500;
        font-size: 24px;
        line-height: 24px;
        color: #FFFFFF;
      }
    }

    .menu__container {
      overflow-y: scroll;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .menu {
        padding-top: 18px;
        flex-grow: 1;
        flex-shrink: 0;
      }

      .logout {
        flex-shrink: 0;
        margin-bottom: 18px;
      }
    }
  }
</style>
