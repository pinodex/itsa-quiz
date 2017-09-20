<template>
  <section class="canvas">
    <cloud v-for="cloud in clouds"
      :key="cloud.id"
      :size="cloud.size"
      :velocity="cloud.velocity"
      :x="cloud.x"
      :y="cloud.y"
      :selected="cloud.selected"

      @end="popCloud(cloud.id)"
      @click="getQuestion(cloud.id)" />
  </section>
</template>

<style lang="scss">
  section.canvas {

  }
</style>

<script>
  import random from 'random-js'
  import Cloud from './Cloud'
  import Question from './Question'

  const SIZES = ['small', 'medium', 'large'],
        rng = random()

  let cloudId = 1

  export default {
    components: { Cloud },

    data () {
      return {
        clouds: [],
        minimumClouds: 20,
        maximumClouds: 30
      }
    },

    created () {
      for (var i = 0; i < this.minimumClouds; i++) {
        this.spawnCloud()
      }
    },

    mounted () {
      const loop = () => {
        for (var i = 0; i < this.clouds.length; i++) {
          if (!this.clouds[i].selected) {
            this.clouds[i].x += this.clouds[i].velocity
          }

          if (this.clouds.length < this.minimumClouds &&
              this.clouds.length < this.maximumClouds) {

            this.spawnCloud()
          }
        }

        requestAnimationFrame(loop)
      }

      loop()
    },

    methods: {
      popCloud (id) {
        this.clouds.splice(this._findCloudIndex(id), 1)
      },

      spawnCloud () {
        this.clouds.push({
          id: cloudId,
          selected: false,
          size: this._getRandomSize(),
          velocity: rng.real(0.1, 0.5),
          y: rng.integer(0, 70),
          x: -50
        })

        cloudId++
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

        const cloud = this.selectCloud(id),
              difficulty = this._toDifficulty(cloud.size)

        this.$http.get('api/quiz/question', { params: { difficulty } })
          .then(response => {
            this.popCloud(id)

            this._showQuestion(response.data)
          })
          .catch(error => {

          })
      },

      _findCloudIndex (id) {
        return this.clouds.findIndex(cloud => cloud.id == id)
      },

      _showQuestion (model, onCancel = () => {}) {
        this.$modal.open({
          component: Question,
          props: { model },

          canCancel: true,

          onCancel
        })
      },

      _getRandomSize () {
        const index = rng.integer(0, SIZES.length - 1)

        return SIZES[index]
      },

      _toDifficulty (size) {
        return SIZES.findIndex(s => s == size) + 1
      }
    }
  }
</script>
