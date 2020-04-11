<template>
  <f7-page name="workspace" bg-color="white">
    <div class="workspace">
      <mf-inapp-navbar :menuButton="true" class="create-order__navbar" :title="'Заявки'"></mf-inapp-navbar>
      <div class="application" v-show="bids.length === 0 && !loading">
        <img class="image" src="../assets/workspace/Artwork.jpg">
        <p class="description">У Вас пока нет активных заявок, создайте новую заявку</p>
      </div>
      <div class="bids-list ptr-content" ref="ptr" data-ptr-distance="55" @ptr:refresh="updateBids" v-show="!loading">
        <div class="ptr-preloader">
          <div class="preloader"></div>
          <div class="ptr-arrow"></div>
        </div>
        <div class="bids-list__wrapper ptr-watch-scrollable">
          <bid-item v-for="bid in bids" :bid="bid" :key="bid.id">
          </bid-item>
        </div>
      </div>
      <div class="loading" v-if="loading">
        <f7-preloader color="green"></f7-preloader>
      </div>
      <a href="/customer/create-order/">
        <div class="add">
          <img src="../assets/workspace/add.svg">
        </div>
      </a>
    </div>
  </f7-page>
</template>

<script>
  import Api from '../services/api'
  import BidItem from "../components/bid";

  export default {
    name: 'workspace',
    components: {BidItem},
    props: {
      title: {
        type: String,
        default: 'Заявки'
      }
    },
    data() {
      return {
        loading: false,
        noAplications: true,
        bids: []
      }
    },
    methods: {
      openLeftSideMenu() {
        console.log('lol')
      },
      updateBids (event, done) {
        console.log(done)
        this.loadBids()
          .then(() => {
            event.detail();
          })
          .catch()
      },
      loadBids () {
        console.log('load bids')
        return Api.customer.getBids()
          .then((response) => {
            this.bids = response.bids.map(bid => ({
              id: bid.id,
              name: bid.name,
              workName: (typeof bid.works[0] !== 'undefined') ? bid.works[0].name : 'Неизвестно',
              created: new Date(bid.createdAt.replace(/-/g, '/')),
              created__: new Date(bid.createdAt),
              created___: bid.createdAt,
              price: bid.price
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
  .workspace{
    display: flex;
    height:100%;
    flex-direction: column;
    .header {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      flex-shrink:0;
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
    .loading{
      flex-grow:1;
      display:flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
    }
    .bids-list{
      flex-grow:1;
      height: calc(100% - 56px);
      overflow:scroll;
      background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
      .bids-list__wrapper{
        padding: 16px 8px;
      }
    }
    .application {
      flex-grow:1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #EAECF4;
      flex-direction: column;

      .image {
        width: 145px;
        height: 135px;
        padding-top: 40%;
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
