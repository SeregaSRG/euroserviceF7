<template>
  <f7-page name="bidsList" bg-color="white">
    <div class="workspace">
      <mf-inapp-navbar :menuButton="true" class="create-order__navbar" :title="pageTitle"></mf-inapp-navbar>
      <div class="bids-list__content ptr-content" ref="ptr" data-ptr-distance="55" @ptr:refresh="updateBids">
        <div class="ptr-preloader">
          <div class="preloader"></div>
          <div class="ptr-arrow"></div>
        </div>
        <div class="application" v-show="bids.length === 0 && !loading">
          <img class="image" src="../../assets/workspace/Artwork.jpg">
          <p class="description">У Вас пока нет активных заявок, создайте новую заявку</p>
        </div>
        <div class="bids-list ptr-watch-scrollable" ref="ptr"
             v-show="!loading && bids.length !== 0">
          <div class="bids-list__wrapper">
            <bid-item v-for="bid in bids" :bid="bid" :key="bid.id">
            </bid-item>
          </div>
        </div>
        <div class="loading ptr-ignore" v-if="loading">
          <f7-preloader color="green"></f7-preloader>
        </div>
      </div>
      <a v-if="!archive" href="/customer/create-order/">
        <div class="add">
          <img src="../../assets/workspace/add.svg">
        </div>
      </a>
    </div>
  </f7-page>
</template>

<script>
  import Api from '../../services/api'
  import BidItem from '../../components/bid';

  export default {
    name: 'bidsList',
    components: {BidItem},
    props: {
      title: {
        type: String,
        default: 'Заявки'
      },
      archive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: false,
        noAplications: true,
        bids: []
      }
    },
    computed: {
      pageTitle() {
        if (this.archive) {
          return 'Архив заявок'
        } else {
          return 'Заявки'
        }
      }
    },
    methods: {
      openLeftSideMenu() {
        console.log('lol')
      },
      updateBids(event, done) {
        console.log(done)
        this.loadBids()
          .then(() => {
            event.detail();
          })
          .catch()
      },
      loadBids() {
        return Api.customer.getBids({
          archive: this.archive
        })
          .then((response) => {
            let serverBids
            if (Array.isArray(response.bids)) {
              serverBids = response.bids
            } else if (Array.isArray(response)) {
              serverBids = response
            } else {
              this.bids = []
              return
            }
            this.bids = serverBids.map(bid => ({
              id: parseInt(bid.id),
              name: bid.name,
              workName: (typeof bid.works[0] !== 'undefined') ? bid.works[0].name : 'Неизвестно',
              created: new Date(bid.createdAt.replace(/-/g, '/')),
              price: bid.price,
              status: bid.status
            }))
            console.log(this.bids)
          })
          .catch((e) => console.error(e))
      }
    },
    mounted() {
      //let ptr = this.$f7.ptr.create(this.$refs['ptr'])
      this.loading = true
      this.loadBids()
        .then(() => {
          this.loading = false
        })
    }
  }
</script>

<style lang="scss" scoped>
  .create-order__navbar {
    z-index: 2 !important;
  }

  .workspace {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-y: hidden;
    position: relative;

    .ptr-preloader {
      z-index: 1;
    }

    .bids-list__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height:calc(100% - 56px);
      overflow-y: scroll;

      .loading {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
      }

      .bids-list {
        z-index: 0;
        height: calc(100% - 56px);
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
        flex-grow: 1;
        position: relative;

        .ptr-preloader {
        }

        .bids-list__wrapper {
          padding: 16px 8px;
        }
      }

      .application {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
        flex-direction: column;

        .image {
          width: 145px;
          height: 135px;
          box-sizing: content-box;
        }

        .description {
          width: 300px;
          height: 50px;
          font-family: Roboto;
          font-style: normal;
          font-size: 18px;
          font-weight: normal;
          line-height: 22px;
          text-align: center;
          color: #BEC2CE;
          padding-top: 15px;
        }
      }
    }

    .header {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      flex-shrink: 0;
      height: 55px;
      box-shadow: 0px 3px 5px rgba(0, 27, 54, 0.15);
      padding: 15px;

      &__title {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #001B36;
      }

      &__side-panel {
        position: absolute;
        left: 15px;
        flex-direction: column;
        padding: 6px 3px;

        .line {
          width: 18px;
          height: 2px;
          background-color: #001B36;
          margin-bottom: 3px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }


  .add {
    position: absolute;
    bottom: 16px;
    right: 16px;
    border-radius: 50%;
    background: #58C2F1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 5px rgba(0, 27, 54, 0.15);
    width: 56px;
    height: 56px;

    img {
      display: block;
    }
  }
</style>
