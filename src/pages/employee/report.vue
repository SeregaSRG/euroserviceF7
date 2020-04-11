<template>
  <f7-page name="report" bg-color="white">
    <div class="report">
      <mf-inapp-navbar class="report__navbar" :title="'Создание ответа'"></mf-inapp-navbar>
      <div class="report__content">
        <mf-page-separator title="Фотографии"></mf-page-separator>
        <photo-input v-model="inputs.photos"></photo-input>
        <div class="mf-page-container">
          <mf-input :w100="true" :error="inputErrors.comment" :valid-condition="validComment" :value.sync="inputs.comment"
                    placeholder="Комментарий"></mf-input>
        </div>
      </div>
      <mf-bottom-button
          class="report__button"
          :disabled="!validComment"
          :action="sendReport"
      >Отправить
      </mf-bottom-button>
    </div>
  </f7-page>
</template>

<script>
  import photoInput from "../../components/photoInput"
  import Api from '../../services/api/modules/employee'

  export default {
    name: "createOrder",
    components: {
      photoInput: photoInput,
    },
    props: {
      bid: {
        type: Object,
        default () {
          return {
            id: 0
          }
        }
      }
    },
    data() {
      return {
        inputs: {
          photos: [],
          comment: ''
        },
        inputErrors: {
          comment: null,
          photos: null
        }
      }
    },
    computed: {
      validComment () {
        return this.inputs.comment.length !== 0
      }
    },
    methods: {
      sendReport() {
        let photosContents = this.inputs.photos.map(photo => ({
          name: photo.name,
          content: photo.base64
        }))

        let request = {
          "bidId": this.bid.id,
          "comment": this.inputs.comment,
          "photos": photosContents
        }
        this.$f7.dialog.preloader('Подождите')
        Api.sendReport(request)
          .then((response) => {
            if (typeof response.error !== 'undefined') {
              this.$f7.dialog.close()
              this.$f7.dialog.alert(response.error.message, 'Ошибка')
            } else {
              // this.$f7router.back()
              this.$f7.dialog.close()
            }
            this.responseErrorHelper(response, 'comment', 'comment', this.inputErrors)
            this.responseErrorHelper(response, 'photos', 'photos', this.inputErrors)
            for (let name in this.inputErrors) {
              if (this.inputErrors.hasOwnProperty(name)) {
                if (this.inputErrors[name] !== null) {
                  return false
                }
              }
            }
            this.$f7router.navigate('/', {
              reloadCurrent: true
            })
          })
          .catch(() => {
            this.$f7.dialog.close()
            this.$f7.dialog.alert('Сервер неверно ответил на запрос', 'Ошибка')
          })
        console.log(request)

        /*let photoPromises = []
        let getPromise = (file) => {
          return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                name: file.name,
                content: e.target.result
              })
            }
            reader.readAsDataURL(file.file)
          })
        }

        this.inputs.photos.forEach(photo => {
          photoPromises.push(getPromise(photo))
        })
        let photosContents = []
        Promise.all([
            new Promise((resolve, reject) => {
              Promise.all(photoPromises)
                .then(values => {
                  photosContents = values
                  resolve()
                })
            })
          ]
        ).then(() => {
        })*/
        //this.$f7.dialog.alert('Для загрузки файлов необходимы изменения в API', 'Подождите')
      }
    },
    watch: {
      'inputErrors.photos' (to) {
        if (to !== null) {
          this.$f7.dialog.alert(this.inputErrors.photos, 'Ошибка')
          this.inputErrors.photos = null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .report {
    height: 100%;
    display: flex;
    flex-direction: column;

    .mf-page-container {
      padding: 16px;

      .mf-page-container__parts-2 {
        display: flex;
        justify-content: space-between;

        & > * {
          width: 48%;
        }
      }
    }

    .report__navbar {
      flex-shrink: 0;
    }

    .report__content {
      flex-grow: 1;
      overflow-y: scroll;
    }

    .report__button{
      flex-shrink: 0;
    }

    .report__about-sum {
      padding: 0 16px 16px 16px;
      color: #BEC2CE;
      font-size: 16px;
      line-height: 24px;
    }
  }
</style>
