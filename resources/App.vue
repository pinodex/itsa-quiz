<template>
  <section class="header is-fh">
    <div class="hero is-danger is-bold">
      <div class="binary-pattern"></div>

      <div class="hero-header">
        <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img :src="gameLogo" />
            </div>
          </div>

          <div class="navbar-menu is-active">
            <div class="navbar-end">
              <a class="navbar-item">
                <span class="icon">
                  <i class="fa fa-sign-in"></i>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Get Started</h1>

          <div class="field">
            <p class="control has-text-centered">
              <button class="button is-large is-info" :class="{ 'is-loading': isLoginLoading }">
                <span class="icon">
                  <i class="fa fa-facebook"></i>
                </span>

                <span>Login with Facebook</span>
              </button>
            </p>
          </div>
        </div>
      </div>

      <div class="hero-footer">
        <div class="level is-mobile">
          <div class="level-left">
            <p>&copy; ITSA</p>
          </div>

          <div class="level-right">
            <a href="#">About</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import gameLogo from './assets/img/itsa_game_logo.png'

  export default {
    data () {
      return {
        gameLogo,

        isLoginLoading: false
      }
    },

    mounted () {
      this.isLoginLoading = true

      this.$root.$on('fb:init', () => {
        FB.getLoginStatus(response => {
          this.isLoginLoading = false

          console.log(response)
        });
      })
    },


  }
</script>

<style lang="scss">

</style>
