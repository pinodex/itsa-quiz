<template>
  <section class="header" :class="{ 'is-fh': !user }">
    <div class="hero is-danger is-bold">
      <div class="binary-pattern"></div>

      <div class="hero-header">
        <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img src="/assets/img/itsa_game_logo.png" />
            </div>
          </div>

          <div class="navbar-menu is-active">
            <div class="navbar-end">
              <a class="navbar-item"
                @click.prevent="logout"
                v-show="user">
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
          <transition name="fade" mode="out-in">
            <section key="user" v-if="user">
              <user :model="user" />
            </section>

            <section key="login" v-else>
              <h1 class="title">Get Started</h1>

              <login />
            </section>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">

</style>

<script>
  import Login from './Login'
  import User from './User'

  export default {
    components: { Login, User },

    computed: {
      user () {
        return this.$store.getters.user
      }
    },

    data () {
      return {

      }
    },

    methods: {
      logout () {
        this.$dialog.confirm({
          message: 'Are you sure you want to logout?',
          onConfirm: () => {
            const loadingComponent = this.$loading.open()

            this.$http.post('api/logout')
              .then(response => {
                this.$store.dispatch('logout')
              })
              .catch(error => {
                let message = error.response.data.error.message || error.message

                this.$dialog.alert({ message,
                  title: 'Error',
                  type: 'is-danger'
                })
              })
              .finally(() => {
                loadingComponent.close()
              })
          }
        })
      }
    }
  }
</script>
