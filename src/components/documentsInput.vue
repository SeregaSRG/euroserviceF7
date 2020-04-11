<template>
  <div class="documents-input">
    <div class="uploads">
      <document-upload :editable="editable" @remove="removeDocument(index)" v-for="(document,index) in documents" :document.sync="documents[index]" :key="document.key"></document-upload>
    </div>
    <div class="add" v-if="editable" @click="addClick">
      <img src="../assets/documentsInput/add.svg" class="add__plus">
    </div>
    <input type="file" ref="fileInput" class="document-input__file">
    <f7-actions ref="actionsSelection">
      <f7-actions-group>
        <f7-actions-button bold @click="openCamera">Открыть камеру</f7-actions-button>
        <f7-actions-button bold @click="openFileManager">Выбрать файл</f7-actions-button>
        <f7-actions-button color="red">Отмена</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </div>
</template>

<script>
  import documentUpload from './documentsInput/document'

  export default {
    name: "documentsInput",
    components: {
      documentUpload: documentUpload
    },
    props: {
      value: {
        type: Array,
        default: []
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        documents: [
          /*{
            key: Math.random().toString(),
            id: 25,
            url: 'https://erosha.ga',
            name: "Интересный документ.pdf",
            file: null
          },
          {
            key: Math.random().toString(),
            id: 26,
            url: 'https://erosha.ga',
            name: "Ещё круче.pdf",
            file: null
          }*/
        ]
      }
    },
    mounted() {
      this.documents = this.value
      this.$refs.fileInput.addEventListener('change', this.selectFile)
    },
    methods: {
      addClick() {
        if (typeof device !== "undefined" && device.platform === 'Android') {
          this.$refs.actionsSelection.open()
        } else {
          this.openFileManager()
        }
      },
      openFileManager() {
        this.$refs.fileInput.click()
      },
      openCamera() {
        navigator.camera.getPicture(
          (base64) => {
            this.documents.push({
              key: Math.random().toString(),
              id: null,
              url: null,
              name: 'Фотография',
              file: null,
              base64: 'data:image/jpeg;base64,'+base64
            })
          }, () => {

          }, {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
          });
      },
      selectFile() {
        this.documents.push({
          key: Math.random().toString(),
          id: null,
          url: null,
          name: this.$refs.fileInput.files[0].name,
          file: this.$refs.fileInput.files[0],
          base64: ''
        })
        this.$refs.fileInput.value = ""
      },
      removeDocument (index) {
        this.documents.splice(index, 1)
      }
    },
    watch: {
      documents () {
        this.$emit('update:value', this.documents)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .documents-input {
    width: 100%;
    padding: 16px;

    .document-input__file{
      display:none;
    }

    .add {
      height: 56px;
      border: 1.5px solid #58C2F1;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
