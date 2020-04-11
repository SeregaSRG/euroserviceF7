<template>
  <div class="photo">
    <img class="photo__image" :src="image.url" v-show="image.url">
    <img class="photo__image" ref="uploadingImage" v-show="readyToShow">
    <div class="photo__uploaded" v-if="state === 'uploaded'">
      <div class="photo__remove" v-if="editable">
        <img @click="removePhoto" src="../../assets/photoInput/remove.svg">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "photo",
    data () {
      return {
        currentImage:null,
        state: 'uploaded',
        readyToShow: false
      }
    },
    props: {
      image: {
        type: Object,
        default () {
          return {
            key: null,
            id: null,
            url: '',
            file:null
          }
        }
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.currentImage = this.image
      if (this.currentImage.file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          console.log(this.$refs)
          this.$refs.uploadingImage.setAttribute('src', e.target.result)
          this.readyToShow = true
          this.currentImage.base64 = e.target.result
          this.currentImage.id = 5
          this.$emit('update:image', this.currentImage)
        }
        reader.readAsDataURL(this.currentImage.file)
      } else if (this.currentImage.base64) {
        this.$refs.uploadingImage.setAttribute('src', this.currentImage.base64)
        this.readyToShow = true
      }
    },
    methods: {
      removePhoto (e) {
        e.stopPropagation()
        this.$emit('remove')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photo {
    width: 98px;
    height: 98px;
    margin-left: 20px;
    background: #F3F3F3;
    border-radius: 6px;
    overflow:hidden;
    position: relative;
    .photo__image{
      width:100%;
      height:100%;
      object-fit:cover;
      position:relative;
    }
    .photo__uploaded{
      width:100%;
      height:100%;
      top:0;
      left:0;
      position: absolute;
      .photo__remove{
        position:absolute;
        right:5px;
        top:5px;
      }
    }
  }
</style>
