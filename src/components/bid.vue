<template>
  <div class="bid" @click="goToBid()">
    <div class="bid__content">
      <div class="work">
        <div class="work__container">
          {{ bid.workName }}
        </div>
      </div>
      <div class="name">
        {{ bid.name }}
      </div>
      <div class="line">
        <div class="date-time">
          <div class="date">{{ date }}</div>
          <div class="time">{{ time }}</div>
        </div>
        <div class="price">{{ bid.price }} р.</div>
      </div>
    </div>
    <div class="bid__status bid__status_search" v-if="bid.status === 10">
      Поиск исполнителя
    </div>
    <div class="bid__status bid__status_in-progress" v-if="bid.status === 20">
      Отменен
    </div>
    <div class="bid__status bid__status_in-progress" v-if="bid.status === 30">
      В работе
    </div>
    <div class="bid__status bid__status_in-progress" v-if="bid.status === 40">
      Просрочен
    </div>
    <div class="bid__status bid__status_in-progress" v-if="bid.status === 50">
      Ожидает подтверждения
    </div>
    <div class="bid__status bid__status_done" v-if="bid.status === 60">
      Выполнен
    </div>
    <div class="bid__status bid__status_done" v-if="bid.status === 70">
      Арбитраж
    </div>
  </div>
</template>

<script>
  export default {
    name: "bid",
    props: {
      bid: {
        type: Object,
        default () {
          return {
            id: 0,
            name: 'Название отсутствует',
            workName: (typeof bid.works[0] !== 'undefined') ? bid.works[0].name : 'Неизвестно',
            created: new Date(),
            price: 0,
            status: 0
          }
        }
      }
    },
    computed: {
      date () {
        let date = this.bid.created
        return ('0' + date.getDate()).slice(-2) + '.'
          + ('0' + (date.getMonth()+1)).slice(-2) + '.'
          + date.getFullYear()
      },
      time () {
        let date = this.bid.created
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
      }
    },
    methods: {
      goToBid () {
        console.log('bid')
        this.$f7router.navigate('/bid/'+this.bid.id, {
          history: true,
          pushState: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bid {
    font-family: "Roboto", sans-serif;
    width: 100%;
    overflow: hidden;
    margin-top: 16px;
    background: #FFFFFF;
    box-shadow: 0px 3px 20px rgba(0, 27, 54, 0.25);
    border-radius: 6px;

    &:first-child {
      margin-top: 0;
    }

    .bid__content {
      padding: 16px;

      .work {
        width: 100%;

        .work__container {

          font-weight: 500;
          font-size: 10px;
          line-height: 12px;
          display: inline-block;
          padding: 2px 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #FFFFFF;
          background: linear-gradient(0deg, #001B36, #001B36), #47C2B1;
          border-radius: 4px;
        }
      }

      .name {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #001B36;
        margin-top: 8px;
      }

      .line {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-weight: 500;
        color: #001B36;
        margin-top: 4px;
        line-height: 22px;

        .date-time {
          display: flex;
          align-items: flex-end;
          .date {
            font-size: 14px;
          }

          .time {
            font-size: 12px;
            margin-left: 8px;
          }
        }

        .price {
          font-size: 18px;
        }
      }
    }

    .bid__status {
      padding: 13px 16px;

      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.1em;
      text-transform: uppercase;


      &.bid__status_search{
        color: #FFFFFF;
        background: linear-gradient(0deg, #FD9927, #FD9927), linear-gradient(0deg, #EAECF4, #EAECF4), #001B36;
      }

      &.bid__status_done{
        color: #001B36;
        background: linear-gradient(0deg, #EAECF4, #EAECF4), #001B36;
      }

      &.bid__status_in-progress{
        color: #FFFFFF;
        background: linear-gradient(0deg, #88BC16, #88BC16), #001B36;
      }
    }
  }
</style>
