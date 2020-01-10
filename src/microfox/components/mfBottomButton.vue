<template>
  <div
      class="mf-button"
      @click.prevent="createAction"
      :class="{
                'mf-button--secondary': modifiers.indexOf('secondary') !== -1,
                'mf-button--rounded': modifiers.indexOf('rounded') !== -1,
                'mf-button--disabled': disabled
            }"
  >
    <p v-if="!isLoading">
      <slot></slot>
    </p>
    <div class="loading" v-else>
      <f7-preloader :size="32" color="white"></f7-preloader>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mfBottomButton",
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      action: {
        type: Function,
        default: () => {
          console.log('button-main')
        }
      },
      modifiers: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean
      }
    },
    methods: {
      createAction () {
        if (!this.isLoading && !this.disabled) {
          this.action()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mf-button {
    width: 100%;
    height: 56px;
    background: linear-gradient(0deg, #58C2F1, #58C2F1);
    box-shadow: 0px -3px 5px rgba(0, 27, 54, 0.15);
    display: flex;
    margin: 0 auto;
    font-weight:500;
    font-family: Roboto;
    overflow: hidden;

    p {
      margin: auto;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      font-size: 16px;
      text-align: center;
      letter-spacing: 2px;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    .loading {
      margin: auto;
      width: 32px;
      height: 32px;
    }

    &--secondary {
      background: #001B36;
    }

    &--disabled {
      background: #EAECF4;
    }

    &--rounded {
      border-radius: 23px;
    }
  }
</style>
