<template>
  <div class="mf-page-separator">
    {{ title }}
  </div>
</template>

<script>
export default {
name: "mfPageSeparator",
  props: {
    title: {
      type: String,
      require: 'Заголовок'
    }
  }
}
</script>

<style lang="scss" scoped>
.mf-page-separator{
  background: #EAECF4;
  width:100%;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #BEC2CE;
}
</style>
