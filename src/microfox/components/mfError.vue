<template>
  <div class="mf-error" v-if="show">
    <div class="mf-error__message">
      {{ message }}
    </div>
    <div class="mf-error__icon">
      <img src="../../microfox/src/error/error.svg">
    </div>
  </div>
</template>

<script>
  export default {
    name: "mf-error",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: 'Error!'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mf-error{
    width:calc(100%  - 10px);
    display: flex;
    align-items: center;
    max-width:328px;
    justify-content: space-between;
    margin:0 auto;
    .mf-error__message{
      color:#F44336;
      font-size: 12px;
      line-height: 16px;
    }
    .mf-error__icon{
      padding-left:20px;
    }
  }
</style>
