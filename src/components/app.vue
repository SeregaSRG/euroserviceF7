<template>
  <f7-app :params="f7params">

    <!-- Left panel with cover effect-->
    <f7-panel ref="panel" v-if="authState" class="panel" left cover theme-dark swipe :swipe-active-area="10"
         :resizable="true"
         :swipe-threshold="10">
      <client-side-panel v-if="f7init"></client-side-panel>
    </f7-panel>


    <!-- Right panel with reveal effect-->
    <f7-panel right reveal theme-dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Right Panel"></f7-navbar>
          <f7-block>Right panel content goes here</f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>


    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
                type="text"
                name="username"
                placeholder="Your username"
                :value="username"
                @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                type="password"
                name="password"
                placeholder="Your password"
                :value="password"
                @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import clientSidePanel from './side-panel/sideMenu'

  export default {
    components: {
      clientSidePanel
    },
    computed: {
      authState() {
        return this.$store.state.auth.auth.loginState
      }
    },
    data() {
      return {
          f7init: false,
        // Framework7 Parameters
        f7params: {
          view:{
            stackPages:true,
          },
          id: 'com.microfox.euroservice', // App bundle ID
          name: 'Euroservice', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },

            };
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
            scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: false,
            androidOverlaysWebView: false,
          },
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
      }
    },
    mounted() {
      console.log(this.$f7)
      console.log(this.$store.state)
      if (this.$store.state.auth.auth.loginState) {
        console.log('test')
        if (this.$store.state.auth.auth.type === 'customer') {
          this.$store.dispatch('customer/getProfile')
        } else if (this.$store.state.auth.auth.type === 'employee') {
          this.$store.dispatch('employee/getProfile')
        }
      }
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        this.f7init = true
        // Call F7 APIs here
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../fonts/Roboto/Roboto";
  @import "../fonts/SF/SF";

  .panel {
    width: 85vw;
    min-width: 150px;
  }
</style>
