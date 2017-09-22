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

            <transition name="fade">
              <div class="navbar-menu is-active" v-if="user">
                <div class="navbar-end">
                  <a class="navbar-item"
                    @click.prevent="toggleLeaderboard"
                    :class="{ 'has-text-warning': leaderboardShow }">
                    <span class="icon">
                      <i class="fa fa-trophy"></i>
                    </span>
                  </a>

                  <a class="navbar-item" @click.prevent="logout">
                    <span class="icon">
                      <i class="fa fa-sign-in"></i>
                    </span>
                  </a>
                </div>
              </div>
            </transition>
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

    <section class="game-content" v-if="user">
      <game v-if="user" />

      <transition name="slide">
        <leaderboard v-if="leaderboardShow" />
      </transition>
    </section>
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
      height: 52px;
    }

    .game-content {
      position: relative;

      flex: 1 1 auto;
      position: relative;
      overflow: hidden;

      & > * {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
</style>

<script>
  import Login from './Login'
  import User from './User'

  import Leaderboard from './Leaderboard'

  import Game from './Game/Index'

  export default {
    components: { Login, User, Game, Leaderboard },

    data () {
      return {
        leaderboardShow: false
      }
    },

    computed: {
      user () {
        return this.$store.getters.user
      },

      mainContentShow () {
        return !this.leaderboardShow
      }
    },

    methods: {
      toggleLeaderboard () {
        this.leaderboardShow = !this.leaderboardShow
      },

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
