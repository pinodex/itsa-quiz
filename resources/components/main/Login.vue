<template>
  <div class="field">
    <p class="control has-text-centered">
      <button class="button is-large is-info"
        :class="{ 'is-loading': isLoginLoading }"
        :disabled="isLoginLoading"
        @click="openDialog">

        <span class="icon">
          <i class="fa fa-facebook"></i>
        </span>

        <span>Login with Facebook</span>
      </button>
    </p>
  </div>
</template>

<style lang="scss">

</style>

<script>
  export default {
    data () {
      return {
        isLoginLoading: false
      }
    },

    mounted () {
      this.$root.$on('fb:init', () => {
        FB.getLoginStatus(f => {
          if (f.status === 'connected') {
            FB.logout()
          }
        })
      })
    },

    methods: {
      openDialog () {
        this.isLoginLoading = true

        FB.login(f => {
          if (f.status !== 'connected') {
            this.isLoginLoading = false

            this.$dialog.alert({
              type: 'is-danger',
              message: 'An error occurred'
            })

            return
          }

          let token = f.authResponse.accessToken

          this._login(token, () => {
            this.isLoginLoading = false
          })
        })
      },

      _login (token, callback = function () {}) {
        return this.$http.post('api/login', { token })
          .then(response => {
            this.$store.dispatch('login', response.data)
          })
          .catch(error => {
            let message = error.response.data.error.message || error.message

            this.$dialog.alert({ message,
              title: 'Error',
              type: 'is-danger'
            })
          })
          .finally(callback)
      }
    }
  }
</script>
