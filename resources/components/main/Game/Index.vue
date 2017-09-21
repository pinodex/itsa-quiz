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
  </section>
</template>

<style lang="scss">
  section.canvas {

  }
</style>

<script>
  import Cloud from './Cloud'
  import Question from './Question'

  export default {
    client: null,
    components: { Cloud },

    data () {
      return {
        clouds: []
      }
    },

    beforeCreate () {
      this.client = this.$io.channel('quiz')
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

    destroyed () {
      this.client.off('cloud:spawn')

      this.client.disconnect()
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
