<template>
  <section class="canvas">
    <cloud v-for="cloud in clouds"
      :key="cloud.id"
      :size="cloud.size"
      :speed="cloud.speed"
      :x="cloud.position_x"
      :y="cloud.position_y"
      :selected="cloud.selected"

      @click="getQuestion(cloud.id)" />

      <transition name="fade">
        <div class="closed" v-show="state == 'close'">
          <p>Game Closed</p>
        </div>
      </transition>
  </section>
</template>

<style lang="scss">
  .canvas {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closed {
    p {
      font-size: 2rem;
      color: #fff;
    }
  }
</style>

<script>
  import Cloud from './Cloud'
  import Question from './Question'

  const SOCKET_NAMESPACE = 'game'

  export default {
    components: { Cloud },

    data () {
      return {
        clouds: [],
        state: null
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
            duration: 10000
          })
        }
      })
    },

    mounted () {
      setTimeout(() => this.$root.setThemeColor('#d39144'), 500)

      this.client.on('disconnect', () => {
        this.$snackbar.open('Disconnected')
      })

      this.client.on('reconnect', () => {
        this.$snackbar.open('Reconnecting...')
      })

      this.client.on('cloud:spawn', cloud => {
        this.spawnCloud(cloud)
      })

      this.client.on('cloud:pop', id => {
        this.popCloud(id)
      })

      this.client.on('question', question => {
        this._showQuestion(question, choice => {
          this._sendAnswer(question, choice)
        })
      })

      this.client.on('state:close', () => {
        // Pop all the clouds!
        this.clouds = []
        this.state = 'close'
      })

      this.client.on('state:open', () => {
        this.state = 'open'
      })

      const loop = () => {
        for (var i = 0; i < this.clouds.length; i++) {
          if (!this.clouds[i].selected) {
            this.clouds[i].position_x += this.clouds[i].speed
          }

          if (this.clouds[i].position_x > 150) {
            this.popCloud(this.clouds[i].id)
          }
        }

        requestAnimationFrame(loop)
      }

      // Begin game loop
      loop()
    },

    beforeDestroy () {
      this.client.off('disconnect')
      this.client.off('reconnect')
      this.client.off('connect')

      this.client.off('cloud:spawn')
      this.client.off('cloud:pop')
      this.client.off('question')

      this.client.off('state:close')
      this.client.off('state:open')

      this.client.disconnect()

      delete this.$io._channelsPool[SOCKET_NAMESPACE]
    },

    methods: {
      popCloud (id) {
        this.clouds.splice(this._findCloudIndex(id), 1)
      },

      spawnCloud (cloud) {
        if (this.clouds.length > 30) {
          return
        }

        cloud.selected = false

        this.clouds.push(cloud)
      },

      selectCloud (id) {
        const index = this._findCloudIndex(id)

        this.clouds[index].selected = true

        setTimeout(() => {
          let missedCloudIndex = this._findCloudIndex(id)

          if (missedCloudIndex != -1) {
            this.clouds[missedCloudIndex].selected = false

            this.$toast.open('Please check your internet connection')
          }
        }, 3000)

        return this.clouds[index]
      },

      deselectCloud (id) {
        const index = this._findCloudIndex(id)

        this.clouds[index].selected = false
      },

      hasCloudSelected () {
        return this.clouds.find(cloud => cloud.selected)
      },

      getQuestion (id) {
        if (this.hasCloudSelected()) {
          return
        }

        const cloud = this.selectCloud(id)

        this.client.emit('cloud:pop', cloud)
      },

      _findCloudIndex (id) {
        return this.clouds.findIndex(cloud => cloud.id == id)
      },

      _showQuestion (model, onPick = () => {}, onCancel = () => {}) {
        let modal = this.$modal.open({
          component: Question,
          props: { model, onPick },

          canCancel: true,

          onCancel
        })
      },

      _sendAnswer (question, choice) {
        this.client.emit('question:answer', {
          question: question.id, choice
        })
      }
    }
  }
</script>
