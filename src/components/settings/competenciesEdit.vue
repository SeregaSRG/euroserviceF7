<template>
  <div ref="popup" @popup:open="popupOpen = true" @popup:closed="popupOpen = false" class="popup competencies-popup">
    <competencies-popup v-if="popupOpen" :value.sync="competenciesIdArray" @accept="send" @reject="closePopup" @close="closePopup"></competencies-popup>
  </div>
</template>

<script>
  import competencies from '../competencies'
  import Api from '../../services/api'

  export default {
    name: "competenciesEdit",
    components: {
      competenciesPopup: competencies
    },
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        popupOpen: false,
        competenciesIdArray: []
      }
    },
    mounted() {
    },
    methods: {
      closePopup () {
        this.$f7.popup.close(this.$refs['popup'])
        this.$emit('update:open', false)
      },
      send () {
        this.$f7.dialog.preloader('Подождите')
        let profile = {
          email: this.$store.state.employee.profile.email,
          phone: this.$store.state.employee.profile.phone,
          name: this.$store.state.employee.profile.firstName,
          secondName: this.$store.state.employee.profile.lastName,
          lastName: this.$store.state.employee.profile.patronymic,
          works: this.competenciesIdArray
        }
        Api.employee.setProfile(profile)
          .then(() => {
            this.$store.dispatch('employee/getProfile').then(() => {
              this.$emit('update:open', false)
              this.$f7.dialog.close()
              this.$f7.popup.close(this.$refs['popup'])
            })
          })
          .catch(() => {
            this.$emit('update:open', false)
            this.$f7.dialog.close()
        })
      }
    },
    watch: {
      open: {
        handler () {
          console.log('changed open')
          if (this.open) {
            this.competenciesIdArray = []
            this.$store.state.employee.profile.qualifications.forEach(qualification => {
              qualification.works.forEach(work => {
                this.competenciesIdArray.push(parseInt(work.id))
              })
            })
            this.popupOpen = true
            this.$f7.popup.open(this.$refs['popup'])
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
