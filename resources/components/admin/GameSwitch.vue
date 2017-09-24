<template>
  <div class="field">
    <b-switch
      size="is-large"
      v-model="gameOpen"

      :disabled="switchDisabled"

      @input="changeState()">
        Open Game
    </b-switch>
  </div>
</template>

<style lang="scss">

</style>

<script>
  let LOCKED = true

  export default {
    data () {
      return {
        switchDisabled: true,
        gameOpen: false
      }
    },

    mounted () {
      this.$http.get('api/admin/open')
        .then(response => {
          this.gameOpen = response.data.state
        })
        .finally(() => {
          this.switchDisabled = false

          LOCKED = false
        })
    },

    methods: {
      changeState () {
        if (LOCKED) {
          return
        }

        let state = 'close'

        if (this.gameOpen) {
          state = 'open'
        }

        this.switchDisabled = true

        this.$http.post('api/admin/open', { state })
          .finally(() => {
            this.switchDisabled = false
          })
      }
    }
  }
</script>
