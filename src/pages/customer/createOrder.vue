<template>
  <f7-page name="creteOrder" bg-color="white">
    <div class="create-order">
      <mf-inapp-navbar class="create-order__navbar" :title="'Создание заявки'"></mf-inapp-navbar>
      <div class="create-order__content">
        <div class="mf-page-container">
          <mf-input :w100="true" @focus="inputErrors.name = ''" :error="inputErrors.name" :value.sync="inputs.name" placeholder="Название"></mf-input>
          <mf-select :w100="true" @input="inputErrors.serviceCategory = ''" :error="inputErrors.serviceCategory" v-model="inputs.serviceCategory" placeholder="Категория"
                     :options="serviceCategories"></mf-select>
          <mf-select @input="inputErrors.work = ''" :loading="worksLoading" :w100="true" :error="inputErrors.work" v-model="inputs.work" placeholder="Наименование работ"
                     :options="works"></mf-select>
          <!--<mf-input :w100="true" :error="inputErrors.serviceName" :value.sync="inputs.serviceName"
                    placeholder="Наименование работ"></mf-input>-->
          <mf-input @focus="inputErrors.address = ''" :w100="true" :error="inputErrors.address" :value.sync="inputs.address"
                    placeholder="Адрес"></mf-input>
        </div>
        <mf-page-separator title="Cрок исполнения"></mf-page-separator>
        <div class="mf-page-container">
          <div class="mf-page-container__parts-2">
            <mf-date-input :w100="true" type="date" v-model="inputs.dateTime" placeholder="Дата"></mf-date-input>
            <mf-date-input :w100="true" type="time" v-model="inputs.dateTime" placeholder="Время"></mf-date-input>
          </div>
        </div>
        <mf-page-separator title="Фотографии"></mf-page-separator>
        <photo-input v-model="inputs.photos"></photo-input>
        <mf-page-separator title="Документы"></mf-page-separator>
        <documents-input v-model="inputs.documents"></documents-input>
        <div class="mf-page-container">
          <mf-input :w100="true" :error="inputErrors.comment" :value.sync="inputs.comment"
                    placeholder="Комментарий"></mf-input>
          <mf-input @focus="inputErrors.price = ''" :w100="true" :error="inputErrors.price" :value.sync="inputs.price"
                    placeholder="Стоимость"></mf-input>
        </div>
        <div class="create-order__about-sum">
          * Рекомендованная рыночная цена.
          За вами всегда остается возможность,
          скорректировать цену на свое усмотрение.
        </div>
        <mf-bottom-button
            :action="createOrder"
        >Создать заявку
        </mf-bottom-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
  import photoInput from "../../components/photoInput"
  import documentsInput from "../../components/documentsInput"
  import Api from '../../services/api/modules/customer'

  export default {
    name: "createOrder",
    components: {
      photoInput: photoInput,
      documentsInput: documentsInput
    },
    data() {
      return {
        serviceCategory: null,
        works: [],
        inputs: {
          name: '',
          serviceCategory: null,
          work: null,
          dateTime: null,
          photos: [],
          documents: [],
          comment: '',
          price: '',
          address: ''
        },
        inputErrors: {
          name: null,
          serviceCategory: null,
          work: null,
          dateTime: null,
          comment: null,
          price: null,
          address: null
        },
        worksLoading: false
      }
    },
    computed: {
      serviceCategories() {
        return this.$store.state.customer.categories
      }
    },
    mounted() {
      this.$store.dispatch('customer/getCategories')
    },
    created() {
      this.inputs.dateTime = new Date(new Date().getTime() + 36000000)
    },
    methods: {
      checkForValid () {
        this.inputErrors.name = null
        this.inputErrors.serviceCategory = null
        this.inputErrors.work = null
        this.inputErrors.dateTime = null
        this.inputErrors.comment = null
        this.inputErrors.price = null
        this.inputErrors.address = null
        if (this.inputs.name.length === 0) {
          this.inputErrors.name = 'Укажите имя'
        }
        if (this.inputs.serviceCategory === null) {
          this.inputErrors.serviceCategory = 'Выберите категорию'
        }
        if (this.inputs.work === null) {
          this.inputErrors.work = 'Выберите наименование'
        }
        if (this.inputs.address.length === 0) {
          this.inputErrors.address = 'Укажите адрес'
        }
        if (this.inputs.price.length === null) {
          this.inputErrors.price = 'Укажите цену'
        }
        else if (!this.inputs.work) {
          this.inputErrors.price = 'Сначала выберите работу'
        } else {
          if (parseInt(this.inputs.price) < this.inputs.work.price) {
            this.inputErrors.price = 'Цена за работу не может быть меньше стандартной'
          }
        }
        for (let index in this.inputErrors) {
          if (this.inputErrors[index]) {
            return false
          }
        }
        return true
      },
      showInputs() {
        console.log(this.serviceCategory)
      },
      createOrder() {
        if (!this.checkForValid()) {
          this.$f7.dialog.alert('Проверьте правильность ввода данных', 'Ошибка')
          return
        }
        let photoPromises = []
        let documentPromises = []
        let getPromise = (file) => {
          console.log(file)
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
        this.inputs.documents.forEach(document => {
          documentPromises.push(getPromise(document))
        })
        let documentsContents = []
        let photosContents = []
        Promise.all([
            new Promise((resolve, reject) => {
              Promise.all(photoPromises)
                .then(values => {
                  photosContents = values
                  resolve()
                })
            }),
            new Promise((resolve, reject) => {
              Promise.all(documentPromises)
                .then(values => {
                  documentsContents = values
                  resolve()
                })
            })
          ]
        ).then(() => {
          let request = {
            "name": this.inputs.name,
            "price": parseInt(this.inputs.price),
            "object": this.inputs.address,
            "comment": this.inputs.comment,
            "completeAt": parseInt(this.inputs.dateTime.getTime() / 1000),
            "photos": photosContents,
            "files": documentsContents
          }
          console.log(this.inputs)
          if (this.inputs.work !== null) {
            request.works = [this.inputs.work.id]
          }
          this.$f7.dialog.preloader('Подождите')
          Api.createBid(request)
            .then((response) => {
              let serverError = false
              if (typeof response.error !== 'undefined') {
                serverError = true
                this.$f7.dialog.close()
                this.$f7.dialog.alert(response.error.message, 'Ошибка')
              } else {
                // this.$f7router.back()
                this.$f7.dialog.close()
              }
              this.responseErrorHelper(response, 'name', 'name', this.inputErrors)
              this.responseErrorHelper(response, 'price', 'price', this.inputErrors)
              this.responseErrorHelper(response, 'object', 'address', this.inputErrors)
              this.responseErrorHelper(response, 'comment', 'comment', this.inputErrors)
              for (let name in this.inputErrors) {
                if (this.inputErrors.hasOwnProperty(name)) {
                  if (this.inputErrors[name] !== null) {
                    return false
                  }
                }
              }
              if (!serverError) {
                this.$f7router.navigate('/', {
                  reloadCurrent: true
                })
              }
            })
            .catch(() => {
              this.$f7.dialog.close()
              this.$f7.dialog.alert('Сервер неверно ответил на запрос', 'Ошибка')
            })
          console.log(request)
        })
        //this.$f7.dialog.alert('Для загрузки файлов необходимы изменения в API', 'Подождите')
      },
      loadWorks () {
        this.worksLoading = true
        this.works = []
        Api.getWorks({
          category: this.inputs.serviceCategory.id
        })
          .then((response) => {
            if (typeof response.works !== 'undefined' && !Array.isArray(response.works)) {
              return false
            }
            this.works = response.works.map(work => ({
              id: work.id,
              name: work.name,
              price: parseInt(work.price)
            }))
            this.worksLoading = false
          })
          .catch(() => {
            this.worksLoading = false
          })
      }
    },
    watch: {
      'inputs.serviceCategory': {
        handler() {
          if (this.inputs.serviceCategory) {
            this.loadWorks()
          }
          /*this.inputs.service = null*/
        }
      },
      'inputs.work': {
        handler () {
          if (this.inputs.work) {
            this.inputs.price = this.inputs.work.price.toString()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .create-order {
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

    .create-order__navbar {
      flex-shrink: 0;
    }

    .create-order__content {
      flex-grow: 1;
      overflow-y: scroll;
    }

    .create-order__about-sum {
      padding: 0 16px 16px 16px;
      color: #BEC2CE;
      font-size: 16px;
      line-height: 24px;
    }
  }
</style>
