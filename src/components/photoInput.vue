<template>
  <div class="photo-input">
    <div class="add__wrapper" v-if="editable" @click="addClick">
      <img class="add__plus" src="../assets/photoInput/plus.svg">
    </div>
    <div class="photo-input__uploads">
      <photo-image @click.native="openGallery" :editable="editable" @remove="removePhoto(index)"
                   v-for="(image,index) in photos" :image.sync="photos[index]" :key="image.key"></photo-image>
    </div>
    <input type="file" ref="fileInput" class="photo-input__file" accept="image/*;capture=camera">
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
  import photo from './photoInput/photo'

  export default {
    name: "photoInput",
    components: {
      photoImage: photo
    },
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        photos: [
          /*{
            key: Math.random().toString(),
            id: 25,
            url: require('../assets/photoInput/examples/1.jpg'),
            file: null
          },
          {
            key: Math.random().toString(),
            url: require('../assets/photoInput/examples/2.jpg'),
            file: null
          }*/
        ]
      }
    },
    mounted() {
      console.log(this.value)
      this.photos = this.value
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
            this.photos.unshift({
              key: Math.random().toString(),
              id: null,
              url: null,
              name: Math.round((Math.random()*1000000)).toString(),
              file: null,
              base64: 'data:image/jpeg;base64,'+base64
            })
          }, () => {

          }, {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
          });
      },
      removePhoto(index) {
        this.photos.splice(index, 1)
      },
      selectFile() {
        console.log(this.$refs.fileInput.files[0])
        this.photos.unshift({
          key: Math.random().toString(),
          id: null,
          url: null,
          name: this.$refs.fileInput.files[0].name,
          file: this.$refs.fileInput.files[0],
          base64: ''
        })
        this.$refs.fileInput.value = ""
      },
      openGallery() {
        console.log(this.value.map(image => image.url))
        let photoBrowser = this.$f7.photoBrowser.create({
          photos: this.value.map(image => image.url),
          popupCloseLinkText: 'Закрыть'
        });
        photoBrowser.open()
        console.log(photoBrowser)
      }
    },
    watch: {
      photos() {
        this.$emit('update:value', this.photos)
        console.log(this.photos)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photo-input {
    width: 100%;
    display: flex;
    padding: 16px 0;
    overflow: scroll;

    .add__wrapper {
      width: 98px;
      height: 98px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-left: 16px;
    }

    .photo-input__uploads {
      display: flex;
      padding-right: 16px;
    }

    .photo-input__file {
      display: none;
    }
  }
</style>
