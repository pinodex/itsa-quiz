<template>
  <div class="columns is-mobile">
    <div class="column has-text-centered">
      <div class="stat">
        <p class="heading">Score</p>
        <p class="title">{{ user.score }}</p>
      </div>
    </div>

    <div class="column has-text-centered">
      <div class="user">
        <figure class="image avatar">
          <img :src="'//graph.facebook.com/' + user.fbid + '/picture?height=256&amp;width=256'">
        </figure>

        <p class="name">{{ user.name }}</p>
      </div>
    </div>

    <div class="column has-text-centered">
      <div class="stat">
        <p class="heading">
          <i class="fa fa-thumbs-up"></i>
          <span>/</span>
          <i class="fa fa-thumbs-down"></i>
        </p>

        <p class="title">{{ rightWrong }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  $small-breakpoint: 400px;

  .user {
    .avatar {
      height: 128px;
      width: 128px;

      border-radius: 100%;
      overflow: hidden;

      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      background: #fff;

      margin: 0 auto;

      @media (max-width: $small-breakpoint) {
        height: 64px;
        width: 64px;
      }
    }

    .name {
      margin-top: 1rem;

      @media (max-width: $small-breakpoint) {
        display: none;
      }
    }
  }

  .stat {
    margin-top: 2rem;

    @media (max-width: $small-breakpoint) {
      margin-top: 0.75rem;

      .title {
        font-size: 1.5rem;
      }
    }
  }
</style>

<script>
  const SOCKET_NAMESPACE = 'user'

  export default {
    props: ['model'],

    data () {
      return {
        user: this.model
      }
    },

    computed: {
      rightWrong () {
        return `${this.user.correct_count} / ${this.user.incorrect_count}`
      }
    },

    beforeCreate () {
      this.client = this.$io.channel(SOCKET_NAMESPACE)
    },

    created () {
      this.client.connect((error, connected) => {
        if (error) {
          this.$snackbar.open({
            message: error,
            type: 'is-danger',
            duration: 1000
          })
        }
      })
    },

    mounted () {
      this.client.on('update', user => {
        this.user = user
      })
    },

    beforeDestroy () {
      this.client.off('update')

      this.client.disconnect()

      delete this.$io._channelsPool[SOCKET_NAMESPACE]
    }
  }
</script>
