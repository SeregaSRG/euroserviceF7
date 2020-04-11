<template>
  <div class="mf-date" @click="openDialog">
    <div class="mf-date__input">
      <div class="mf-date__placeholder" v-if="!computedValue">{{ placeholder }}</div>
      <div class="mf-date__value" v-if="computedValue">{{ computedValue }}</div>
    </div>
    <div class="mf-date__error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "mfDateInput.vue",
    props: {
      w100: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "date"
      },
      description: {
        type: String,
        default: null
      },
      error: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      },
      value: {
        type: Date,
        default () {
          return new Date()
        }
      },
      val: {
        type: String,
        default: null
      },
      pattern: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: null
      },
      center: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: 'Плейсхолдер'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      mask: {
        type: String,
        default: null
      },
      minVal: {
        type: Date,
        default: null
      },
      maxVal: {
        type: Date,
        default: null
      }
    },
    data() {
      return {
        focus: false,
        currentValue: null
      }
    },
    computed: {
      computedValue() {
        if (!this.currentValue) {
          return null
        }
        let getWithZero = function (digit) {
          if (digit < 10) {
            return '0' + digit
          } else {
            return digit.toString()
          }
        }
        let date = new Date(this.currentValue)
        if (this.type === 'date') {
          return getWithZero(date.getDate())+'.'+getWithZero(date.getMonth()+1)+'.'+date.getFullYear()
        } else {
          return getWithZero(date.getHours())+':'+getWithZero(date.getMinutes())
        }
      }
    },
    mounted () {
      this.currentValue = this.value
    },
    methods: {
      openDialog() {
        let config = {
          date: (this.currentValue) ? this.currentValue : new Date(),
          success: (newDate) => {
            // Handle new date.
            this.currentValue = newDate
            this.$emit('update:value', this.currentValue)
          }
        }
        if (this.minVal) {
          config.minDate = this.minVal
        }
        if (this.maxVal) {
          config.maxDate = this.maxVal
        }
        if (this.type === 'date' || this.type === 'time') {
          config.mode = this.type
        }
        console.log(config)
        cordova.plugins.DateTimePicker.show(config)

      }
    }
  }
</script>

<style lang="scss" scoped>
  .mf-date {

    width: 100%;
    height: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .mf-date__input {
      width: calc(100% - 10px);
      max-width: 328px;
      height: 50px;
      background: #F3F3F3;
      border-radius: 3px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #001B36;
      position: relative;

      :before {
        position: absolute;
        height: 100%;
        right: 16px;
        display: flex;
        align-items: center;
        content: url("../src/elements/selectArrow.svg")
      }

      &.mf-input__input_w100 {
        width: 100%;
        max-width: none;
      }

      .mf-date__placeholder {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #BEC2CE;
      }

      .mf-date__value {
        width: 100%;
        padding: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #001B36;
      }
    }

    .mf-date__error-message {
      height: 18px;
      width: calc(100% - 10px);
      max-width: 328px;
      padding-left: 14px;
      color: red;
      font-size: 12px;

    }
  }
</style>
