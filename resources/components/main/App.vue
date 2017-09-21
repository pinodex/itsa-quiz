<template>
  <div class="app">
    <section class="header" :class="{ 'is-fh': !user }">
      <div class="hero is-bold" :class="{ 'is-danger': !user, 'is-transparent': user }">
        <transition name="fade">
          <div class="binary-pattern" v-if="!user"></div>
        </transition>

        <div class="hero-header">
          <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <div class="navbar-item">
                <img src="/assets/img/itsa_game_logo.png" />
              </div>
            </div>

            <div class="navbar-menu is-active">
              <div class="navbar-end">
                <transition name="fade">
                  <a class="navbar-item" @click.prevent="logout" v-show="user">
                    <span class="icon">
                      <i class="fa fa-sign-in"></i>
                    </span>
                  </a>
                </transition>
              </div>
            </div>
          </nav>
        </div>

        <div class="hero-body">
          <div class="container">
            <transition name="fade" mode="out-in">
              <section key="user" v-if="user">
                <user :model="user" />
              </section>

              <section key="login" v-else>
                <h1 class="title has-text-centered">Get Started</h1>

                <login />
              </section>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <game v-if="user" />
  </div>
</template>

<style lang="scss">
  .app {
    background: linear-gradient(to bottom, #d39144 0%, #0072d0 100%);

    display: flex;
    flex-flow: column;

    height: 100vh;

    .header {
      flex: 0 1 auto;
    }

    .canvas {
      flex: 1 1 auto;
      position: relative;
      overflow: hidden;
    }
  }
</style>

<script>
  import Login from './Login'
  import User from './User'

  import Game from './Game/Index'

  export default {
    components: { Login, User, Game },

    computed: {
      user () {
        return this.$store.getters.user
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
