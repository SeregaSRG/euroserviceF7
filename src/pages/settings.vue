<template>
  <f7-page name="settings" bg-color="white">
    <div class="settings">
      <mf-inapp-navbar class="settings__navbar" :title="'Настройки'"></mf-inapp-navbar>
      <div class="settings__content">
        <div class="personal-info">
          <div class="avatar">
            <img v-if="profile.photo" class="avatar__image" :src="profile.photo">
            <img v-else class="avatar__image" src="../assets/side-panel/profile.svg">
          </div>
          <div class="profile__name">{{ fullName }}</div>
        </div>
        <div class="balance">
          <div class="balance__label">Баланс</div>
          <div class="balance__value">{{ profile.balance }} Р</div>
        </div>
        <div class="settings__group group">
          <div class="contact">
            <div class="contact__description">Телефон</div>
            <div class="contact__value">{{ profile.phone }}</div>
          </div>
          <div class="contact">
            <div class="contact__description">Электронный адрес</div>
            <div class="contact__value">{{ email }}</div>
          </div>
        </div>
        <div class="settings__separator" v-if="profileType === 'employee'"></div>
        <div class="settings__group group" v-if="profileType === 'employee'">
          <div class="group__title">Компетенции</div>
          <div class="competency" v-for="qualification in qualifications" :key="qualification.name">
            <div class="competency__category">{{ qualification.name }}</div>
            <div class="competency__subcategory">{{ worksList(qualification) }}</div>
          </div>
        </div>
        <div class="settings__separator"></div>
        <div class="settings__group group">
          <div class="group__title">Настройки</div>
          <div class="switcher">
            <div class="switcher__description">Получать уведомления</div>
            <div class="switcher__toggler">
              <label class="toggle toggle-init color-blue">
                <input type="checkbox" checked>
                <span class="toggle-icon"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
  export default {
    name: "settings",
    computed: {
      profile () {
        if (this.$store.state.auth.auth.type === 'customer') {
          return this.$store.state.customer.profile
        } else if (this.$store.state.auth.auth.type === 'employee') {
          return this.$store.state.employee.profile
        }
      },
      qualifications () {
        if (this.$store.state.auth.auth.type === 'employee') {
          return this.$store.state.employee.profile.qualifications
        }
      },
      profileType () {
        return this.$store.state.auth.auth.type
      },
      fullName () {
        return this.profile.firstName + ' ' + this.profile.lastName
      },
      email () {
        return this.profile.email
      }
    },
    methods: {
      worksList (qualification) {
        return qualification.works.map(work => work.name).join(',')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settings {
    height: 100%;
    display: flex;
    flex-direction: column;

    .settings__navbar {
      flex-shrink: 0;
    }

    .settings__content {
      background: #EAECF4;
      flex-grow: 1;
      overflow-y: scroll;

      .personal-info {
        width: 100%;
        background: #20BBFC;
        padding: 16px;

        .avatar {
          width: 64px;
          height: 64px;
          overflow: hidden;
          border-radius: 50%;

          .avatar__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .profile__name {
          margin-top: 10px;
          font-size: 18px;
          line-height: 20px;
          color: #FFFFFF;
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

      .settings__group {
        background: #ffffff;
        padding: 0 16px;

        .group__title {
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
          height: 40px;
          display: flex;
          align-items: center;
          color: #001B36;
        }

        .contact {
          height: 40px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .contact__description {
            font-size: 14px;
            line-height: 24px;
            color: #001B36;
            opacity: 0.5;
          }

          .contact__value {
            font-size: 14px;
            line-height: 24px;
            color: #001B36;
          }
        }

        .competency {
          width: 100%;
          padding: 8px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .competency__category {
            font-size: 14px;
            line-height: 24px;
            color: #001B36;
          }

          .competency__subcategory {
            font-size: 14px;
            line-height: 24px;
            color: #001B36;
            max-width:70%;
            text-align:right;
          }
        }
      }

      .switcher {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .switcher__description {
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          color: #001B36;
        }
      }

      .settings__separator {
        width: 100%;
        height: 12px;
      }
    }
  }
</style>
