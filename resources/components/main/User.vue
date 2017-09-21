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
          <figure class="image is-128x128 avatar">
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
  .user {
    .avatar {
      border-radius: 100%;
      overflow: hidden;

      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      background: #fff;

      margin: 0 auto;
    }

    .name {
      margin-top: 1rem;
    }
  }

  .stat {
    margin-top: 2rem;
  }
</style>

<script>
  export default {
    client: null,
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
      this.client = this.$io.channel('user')
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
    }
  }
</script>
