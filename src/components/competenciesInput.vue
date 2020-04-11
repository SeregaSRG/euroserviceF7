<template>
  <div class="competencies-input popup-open" data-popup=".competencies-popup">
    <div class="competencies-input__input" :class="{'competencies-input__input_error': conditionFailed}">
      <div class="competencies-input__placeholder" v-if="values.length === 0">Компетенции</div>
      <div class="competencies-input__value" v-if="values.length !== 0">Выбрано компетенций: {{ values.length }}</div>
    </div>
    <div ref="popup" @popup:open="onFocus" @popup:closed="onBlur" @popup:close="" class="popup competencies-popup">
      <competencies-popup v-if="popupOpen" :value.sync="values" @accept="closePopup" @reject="closePopup" @close="closePopup"></competencies-popup>
    </div>
  </div>
</template>

<script>
  import competenciesPopup from './competencies'

  export default {
    name: "competenciesInput",
    data () {
      return {
        values: [],
        popupOpen: false,
        conditionFailed: false
      }
    },
    props: {
      competencies: {
        type: Array,
        default: () => {
          return []
        }
      },
      validCondition: {
        type: Boolean,
        default: null
      }
    },
    components: {
      competenciesPopup: competenciesPopup
    },
    methods: {
      onFocus(e) {
        this.popupOpen = true
        this.$emit('focus', e)
        this.conditionFailed = false
      },
      onBlur() {
        this.popupOpen = false
        if (this.validCondition === false) {
          this.conditionFailed = true
        }
      },
      closePopup () {
        this.$f7.popup.close(this.$refs['popup'])
      }
    },
    mounted() {
      this.values = this.competencies
    },
    watch: {
      values () {
        this.$emit('update:competencies', this.values)
      },
      validCondition () {
        if (this.validCondition) {
          this.conditionFailed = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .competencies-input {

    width: 100%;
    height: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .competencies-input__input {
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

      &.competencies-input__input_error{
        border:solid 1px #ff0000;
      }

      &.mf-input__input_w100 {
        width: 100%;
        max-width: none;
      }

      .competencies-input__placeholder {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #BEC2CE;
      }

      .competencies-input__value {
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
