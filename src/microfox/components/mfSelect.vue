<template>
  <div class="mf-select">
    <div class="mf-select__wrapper"
         :class="{ 'mf-input__wrapper_w100' : w100 }">
      <div class="mf-select__placeholder" v-if="(currentValue === null || currentValue === undefined) && !loading"> {{ placeholder }}</div>
      <select v-if="!loading" class="mf-input__select"
              :placeholder="placeholder"
              ref="input"  :disabled="disabled" v-model="currentValue">
        <option v-for="option in options" :value="option" :key="option.id">{{ option[optionName] }}</option>
      </select>
      <div class="mf-select__loading" v-if="loading">
        Загрузка...
      </div>
      <div v-if="!loading && options.length !== 0" class="mf-select__arrow">
        <img src="../src/elements/selectArrow.svg">
      </div>
    </div>
    <!--<input
        type="select"
        :disabled="disabled"
        ref="input"
        v-model="currentValue"
        class="mf-input__input"
        :placeholder="placeholder"
        :class="{ 'mf-input__input_w100' : w100 }"
    >-->
    <div class="mf-input__error-message"
         :class="{ 'mf-input__error-message_w100' : w100 }">
      {{ error }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mfSelect',
    props: {
      options: {
        type: Array,
        default () {
          return []
        }
      },
      error: {
        type: String,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      optionName: {
        type: String,
        default: 'name'
      },
      w100: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        default: null
      },
      required: {
        type: Boolean,
        default: false
      },
      value: {
        default: null
      },
      val: {
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
      }
    },
    data () {
      return {
        focus: false,
        currentValue: null
      }
    },
    watch: {
      value (newValue) {
        this.currentValue = this.value
      },
      currentValue () {
        this.$emit('input', this.currentValue)
      },
      options () {
        this.currentValue = null
      }
    },
    mounted () {
      this.currentValue = this.value
    }
  }
</script>

<style lang="scss" scoped>
  .mf-select {
    width: 100%;
    min-height: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    .mf-select__wrapper{
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
      .mf-select__arrow{
        position:absolute;
        height:100%;
        right:16px;
        top:0;
        display:flex;
        align-items: center;
        img{
          display:block;
        }
      }
      .mf-select__loading{
        position:absolute;
        width:100%;
        height:100%;
        padding: 0 10px;
        display:flex;
        align-items: center;
        color: #BEC2CE;
      }
      .mf-select__placeholder{
        position:absolute;
        width:100%;
        height:100%;
        padding: 0 10px;
        display:flex;
        align-items: center;
        color: #BEC2CE;
      }
      .mf-input__select {
        position: relative;
        option{
          font-family: Roboto;
        }
        width:100%;
        height:100%;
        padding: 0 10px;
        box-sizing: border-box;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #001B36;

        &::placeholder {
          color: #BEC2CE;
        }
      }
      &.mf-input__wrapper_w100{
        width:100%;
        max-width:none;
      }
    }
    .mf-input__error-message {
      min-height: 18px;
      width: calc(100% - 10px);
      max-width: 328px;
      padding-left: 14px;
      color: red;
      font-size: 12px;
      &.mf-input__error-message_w100{
        width:100%;
        max-width:none;
      }
    }
  }
</style>
