<template>
  <f7-page name="customer-bid" bg-color="white">
    <div class="bid">
      <mf-inapp-navbar class="create-order__navbar" :title="'Заявка №'+bidId"></mf-inapp-navbar>
      <div class="bid__loading" v-if="loading">
        <f7-preloader color="green"></f7-preloader>
      </div>
      <div class="bid__content" v-if="!loading">
        <mf-page-separator v-if="bidData.employeeComment" title="Отчет исполнителя"></mf-page-separator>
        <div class="mf-page-container" v-if="bidData.employeeComment">
          <div class="bid__field">
            {{ bidData.employeeComment }}
          </div>
        </div>
        <mf-page-separator v-if="bidData.employeePhotos.length" title="Фотографии исполнителя"></mf-page-separator>
        <photo-input v-if="bidData.employeePhotos.length" :editable="false"
                     v-model="bidData.employeePhotos"></photo-input>
        <mf-page-separator title="Информация по работам"></mf-page-separator>
        <div class="mf-page-container">
          <div class="bid__field">
            {{ bidData.name }}
          </div>
          <div class="bid__field">
            {{ bidData.name }}
          </div>
          <div class="bid__field" v-if=" bidData.workName">
            {{ bidData.workName }}
          </div>
          <div class="bid__field" v-if="bidData.address">
            {{ bidData.address }}
          </div>
        </div>
        <mf-page-separator title="Срок исполнения"></mf-page-separator>
        <div class="mf-page-container">
          <div class="mf-page-container__parts-2">
            <div class="bid__field">
              {{ date }}
            </div>
            <div class="bid__field">
              {{ time }}
            </div>
          </div>
        </div>
        <mf-page-separator v-if="bidData.customerPhotos.length" title="Фотографии"></mf-page-separator>
        <photo-input v-if="bidData.customerPhotos.length" :editable="false"
                     v-model="bidData.customerPhotos"></photo-input>
        <mf-page-separator v-if="bidData.documents.length" title="Документы"></mf-page-separator>
        <documents-input v-if="bidData.documents.length" :editable="false"
                         v-model="bidData.documents"></documents-input>
        <div class="mf-page-container mf-page-container_without-top-padding">
          <div class="bid__field" v-if="bidData.customerComment">
            {{ bidData.customerComment }}
          </div>
          <div class="bid__field">
            {{ bidData.price }}
          </div>
        </div>
      </div>
      <mf-bottom-button
          class="bid__button"
          :action="acceptBid"
          v-if="bidData.status === 50"
      >Принять работу
      </mf-bottom-button>
    </div>
  </f7-page>
</template>

<script>
  import Api from '../../services/api'
  import photoInput from "../../components/photoInput"
  import documentsInput from "../../components/documentsInput"

  export default {
    name: "bid",
    components: {
      photoInput: photoInput,
      documentsInput: documentsInput
    },
    data() {
      return {
        loading: false,
        bidData: {
          id: null,
          name: null,
          status: 0,
          price: 0,
          address: null,
          completeTime: new Date(),
          customerComment: null,
          employeeComment: null,
          customerPhotos: [],
          employeePhotos: [],
          documents: []
        }
      }
    },
    props: {
      bidId: {
        type: String,
        default: "0"
      }
    },
    computed: {
      date() {
        let date = this.bidData.completeTime
        return ('0' + date.getDate()).slice(-2) + '.'
          + ('0' + (date.getMonth() + 1)).slice(-2) + '.'
          + date.getFullYear()
      },
      time() {
        let date = this.bidData.completeTime
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
      }
    },
    methods: {
      acceptBid() {
        this.$f7.dialog.preloader('Подождите')
        Api.customer.acceptBid({
          bidId: this.bidData.id,
          status: true
        })
          .then(() => {
            this.$f7.dialog.close()
            this.$f7.dialog.alert('Работа принята', 'Выполнено')
            this.$f7router.navigate('/', {
              reloadCurrent: true
            })
          })
          .catch((response) => {
            this.$f7.dialog.close()
            if (typeof response.data.error.message !== 'undefined') {
              this.$f7.dialog.alert(response.data.error.message, 'Ошибка')
            } else {
              this.$f7.dialog.alert('Сервер неверно ответил на запрос', 'Ошибка')
            }
          })
      },
      loadBid() {
        this.loading = true
        Api.customer.getBid({
          bidId: parseInt(this.bidId)
        })
          .then((response) => {
            if (response.error) {
              this.$f7.dialog.alert(response.error.message, 'Ошибка')
              this.$f7.views.main.router.back()
              return
            }
            this.bidData = {
              id: response.id,
              name: response.name,
              status: response.status,
              price: response.price,
              address: response.object,
              completeTime: new Date(),
              customerComment: response.customerComment,
              employeeComment: response.employeeComment,
              customerPhotos: response.customerPhotos.map(photo => ({
                key: Math.random().toString(),
                id: null,
                url: photo.url,
                name: null,
                file: null
              })),
              workName: (typeof response.works[0] !== 'undefined') ? response.works[0].name : null,
              employeePhotos: response.employeePhotos.map(photo => ({
                key: Math.random().toString(),
                id: null,
                url: photo.url,
                name: null,
                file: null
              })),
              documents: response.files.map(document => ({
                key: Math.random().toString(),
                id: null,
                url: document.url,
                name: document.name,
                file: null
              }))
            }
            console.log(this.bidData)
            this.loading = false
          })
          .catch(() => {
            this.loading = false
            this.$f7.dialog.alert('Неизвестная ошибка', 'Ошибка')
            this.$f7.views.main.router.back()
          })
      }
    },
    mounted() {
      this.loadBid()
    }
  }
</script>

<style lang="scss" scoped>
  .bid {
    display: flex;
    flex-direction: column;
    height: 100%;

    .create-order__navbar {
      flex-shrink: 0;
    }

    .bid__content {
      overflow: scroll;
      flex-grow: 1;

      .mf-page-container {
        padding: 16px;

        &.mf-page-container_without-top-padding {
          padding-top: 0;
        }

        .mf-page-container__parts-2 {
          display: flex;
          justify-content: space-between;

          & > * {
            width: 48%;
          }
        }
      }

      .bid__field {
        padding: 13px 9px;
        width: 100%;
        background: #F3F3F3;
        font-size: 16px;
        line-height: 24px;
        color: #001B36;
        margin-bottom: 20px;
        border-radius: 3px;
      }
    }

    .bid__button {
      flex-shrink: 0;
    }

    .bid__loading {
      width: 100%;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
