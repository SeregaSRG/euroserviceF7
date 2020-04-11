<template>
  <div class="mf-input">
    <input
        :type="type"
        :pattern="pattern"
        :disabled="disabled"
        ref="input"
        v-model="currentValue"
        v-bind:value="currentValue"
        v-on:input="currentValue=$event.target.value"
        class="mf-input__input"
        :placeholder="placeholder"
        :class="{ 'mf-input__input_w100' : w100 }"
        @input="$emit('change', $event)"
        @focus="$emit('focus', $event)"
    >
    <div class="mf-input__address-list" v-if="addressList">
      <div class="mf-input__address-list_item" @click="selectAddress(addressItem.result)" v-for="addressItem in addressList" :key="addressItem.result">
        {{ addressItem.result }}
      </div>
    </div>
    <div class="mf-input__error-message"
         :class="{ 'mf-input__error-message_w100' : w100 }">
      {{ error }}
    </div>
  </div>
</template>

<script>
  import Api from '../../services/api/modules/site'
  import axios from 'axios'
  import InputMask from 'inputmask'
  export default {
    name: 'mfInputAddress',
    props: {
      w100: {
        type: Boolean,
        default: false
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
        type: String,
        default: null
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
      maxVal: {
        type: Number,
        default: undefined
      }
    },
    data () {
      return {
        focus: false,
        currentValue: null,
        addressList: null,
        inputTimeout: null,
        changing: true,
        bodyListener: null
      }
    },
    watch: {
      value (newValue) {
        this.currentValue = this.value
      },
      currentValue () {
        if (this.inputTimeout) {
          clearTimeout(this.inputTimeout)
        }
        if (this.changing) {
          this.inputTimeout = setTimeout(() => {
            this.loadAddress()
          }, 1000)
        }
        this.$emit('update:value', this.currentValue)
      },
      addressList () {
        let listener = () => {
          this.addressList = null
        }
        if (this.addressList) {
          window.addEventListener('click', listener)
        } else {
          this.changing = true
          window.removeEventListener('click', listener)
        }
      }
    },
    methods: {
      addListener() {
      },
      selectAddress(value) {
        console.log(value)
        this.currentValue = value
        this.closeList()
      },
      closeList() {
        this.addressList = null
        this.changing = false
      },
      loadAddress () {
        if (this.value.length < 2) {
          return
        }
        Api.suggestAddress({
          'term': this.value
        })
          .then((e) => {
            this.addressList = e.result
          })
      }
    },
    mounted () {
      this.currentValue = this.value
      if (this.mask) {
        let mask = new InputMask({
          mask: this.mask
        })
        mask.mask(this.$refs.input)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mf-input {
    width: 100%;
    min-height: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .mf-input__address-list{
      width:100%;
      background: #F3F3F3;
      position: absolute;
      top:50px;
      z-index:1;
      .mf-input__address-list_item{
        font-size: 16px;
        padding:10px 10px;
      }
    }
    .mf-input__input {
      width: calc(100% - 10px);
      max-width: 328px;
      height: 50px;
      background: #F3F3F3;
      border-radius: 3px;
      padding: 0 10px;
      box-sizing: border-box;

      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #001B36;
      flex-shrink: 0;
      &.mf-input__input_w100{
        width:100%;
        max-width:none;
        .mf-input__error-message{
          width:100%;
          max-width:none;
        }
      }

      &::placeholder {
        color: #BEC2CE;
      }
    }
    .mf-input__error-message {
      min-height: 18px;
      width: calc(100% - 10px);
      padding-bottom:3px;
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
