<template>
  <div class="document" @click="openInBrowser" :class="{ 'document_not-editable' : !editable }">
    <div class="document__uploaded" @click="openFileInBrowser">
      <div class="document__icon">
        <img src="../../assets/documentsInput/fileTypes/pdf.svg" class="document__icon-image">
      </div>
      <div class="document__name">{{ document.name }}</div>
      <div class="document__remove" v-if="editable">
        <img @click="remove" class="document__remove_image" src="../../assets/documentsInput/remove.svg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "document",
    data() {
      return {
        currentDocument: null,
        state: 'uploaded',
        readyToShow: false
      }
    },
    props: {
      editable: {
        type: Boolean,
        default: true
      },
      document: {
        type: Object,
        default() {
          return {
            key: null,
            id: null,
            url: '',
            name: 'Супер-название',
            file: null
          }
        }
      }
    },
    mounted() {
      this.currentDocument = this.document
      if (this.currentDocument.file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.readyToShow = true
          this.currentDocument.base64 = e.target.result
          this.currentDocument.id = 5
          this.$emit('update:document', this.currentDocument)
          console.log(this.currentDocument)
        }
        reader.readAsDataURL(this.currentDocument.file)
      }
    },
    methods: {
      openFileInBrowser () {
        if (!this.editable) {
          window.open(this.currentDocument.url, '_system');
          return false;
        }
      },
      remove(e) {
        e.stopPropagation()
        this.$emit('remove')
      },
      openInBrowser () {
        if (!this.editable && this.document.url) {
          cordova.InAppBrowser.open(this.url, '_system', 'location=yes')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .document {
    width: 100%;
    height: 52px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 20px;

    &.document_not-editable:last-child{
      margin-bottom:0;
    }

    .document__uploaded {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: linear-gradient(0deg, #EAECF4, #EAECF4), #FFFFFF;

      .document__icon {
        flex-shrink: 0;
        margin-left: 8px;

        .document__icon-image {
          display: block;
        }
      }

      .document__name {
        flex-grow: 1;
        flex-shrink: 0;
        margin-left: 8px;
        margin-right: 8px;
        max-width: calc(100% - 72px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .document__remove {
        .document__remove_image {
          display: block;
        }

        margin-right: 8px;
        flex-shrink: 0;
      }
    }
  }
</style>
