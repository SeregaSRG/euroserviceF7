<template>
  <div class="competencies">
    <mf-inapp-navbar class="create-order__navbar" :tick="true" :backButtonRouter="false" @back="reject" @tick="accept" :title="'Компетенции'"></mf-inapp-navbar>
    <div class="competencies__list" v-if="!loading">
      <div class="category"
           :class="{'category_opened': category.open}"
           v-for="category in categories"
           :key="category.id">
        <div class="category-spoiler" @click="category.open = !category.open">
          <div class="category-title">
            {{ category.name }}
          </div>
          <div class="category-arrow">
            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5L5 0L10 5H0Z" fill="#001B36"/>
            </svg>
          </div>
        </div>
        <div class="category__items">
          <div class="category__items-wrapper">
            <div class="item" v-for="value in category.values" :key="value.id"
                 @click="value.selected = !value.selected">
              <div class="item__checkbox">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                     v-if="value.selected">
                  <path d="M1 4.91304L6.84696 10.2911C7.26674 10.6772 7.92393 10.6346 8.29032 10.1975L16 1"
                        stroke="#58C2F1" stroke-width="2"/>
                </svg>
              </div>
              <div class="item__title">{{ value.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      Загрузка
    </div>
  </div>
</template>

<script>
  import Api from '../services/api'

  export default {
    name: "competencies",
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        loading: false,
        categories: [],
        currentValue: []
      }
    },
    computed: {
      currentSelected () {
        let retArr = []
        this.categories.forEach(category => {
          category.values.forEach(work => {
            if (work.selected) {
              retArr.push(work.id)
            }
          })
        })
        console.log(retArr)
        return retArr
      }
    },
    methods: {
      accept () {
        this.$emit('update:value', this.currentSelected)
        this.$emit('accept')
      },
      reject () {
        this.$emit('reject')
      }
    },
    mounted() {
      this.currentValue = this.value
      this.loading = true
      console.log(this.currentValue)
      Api.customer.getWorksList()
        .then(response => {
          this.loading = false
          this.categories = response.map(category => ({
            id: category.id,
            name: category.name,
            open: false,
            values: category.works.map(work => ({
              id: work.id,
              name: work.name,
              selected: (this.currentValue.find(val => val === work.id))
            }))
          }))
          console.log(response)
        })
        .catch()
    }
  }
</script>

<style lang="scss" scoped>
  .competencies {
    display: flex;
    flex-direction: column;
    height: 100%;

    .create-order__navbar {
      flex-shrink: 0;
    }

    .loading {
      flex-grow: 1;
      flex-shrink: 0;
      background-color: #EAECF4;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .competencies__list {
      flex-grow: 1;
      background-color: #EAECF4;
      overflow-y: scroll;

      .category {
        margin-top: 5px;
        width: 100%;

        &.category_opened{
          .category-arrow{
            transform: rotate(0)!important;
          }
          .category__items{
            height:auto;
          }
        }

        &:first-child {
          margin-top: 10px;
        }

        .category-spoiler {
          width: 100%;
          background-color: #ffffff;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0;

          .category-title {
            color: #001B36;
            font-size: 14px;
            line-height: 24px;
          }

          .category-arrow {
            transform: rotate(180deg);
          }
        }

        .category__items {
          overflow: hidden;
          height:0;
          .category__items-wrapper{
            padding: 13px 16px;
          }

          .item {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 15px;

            &:first-child {
              margin-top: 0;
            }

            .item__checkbox {
              width: 25px;
              height: 25px;
              border: 1px solid #4F4F4F;
              box-sizing: border-box;
              border-radius: 5px;
              font-size: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            .item__title {
              font-size: 14px;
              line-height: 24px;
              color: #001B36;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>
