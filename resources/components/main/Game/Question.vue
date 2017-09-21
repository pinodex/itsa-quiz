<template>
  <div class="card question">
    <div class="card-content">
      <div class="level is-mobile">
        <div class="level-left">
          <h2 class="subtitle">Question</h2>
        </div>

        <div class="level-right">
          <p class="is-size-4 has-text-danger" v-show="isTimed">{{ seconds }}</p>
        </div>
      </div>

      <div class="content">
        {{ model.text }}
      </div>

      <ul class="choices">
        <li v-for="choice in model.choices" @click="pick(choice.id)">{{ choice.text }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .card.question {
    ul.choices {
      li {
        background: #ccc;
        padding: 0.5rem 1rem;

        cursor: pointer;

        &:hover {
          background: #2196f3;
          color: #fff;
        }

        & + li {
          margin-top: 0.5rem;
        }
      }
    }
  }
</style>

<script>
  export default {
    props: ['model', 'onPick'],

    mounted () {
      if (this.isTimed) {
        this.seconds = this.model.expiry

        setInterval(() => this.seconds--, 1000)
      }
    },

    data () {
      return {
        seconds: 0
      }
    },

    methods: {
      pick (id) {
        this.$emit('close')

        this.onPick(id)
      }
    },

    computed: {
      isTimed () {
        return 'expiry' in this.model
      }
    },

    watch: {
      seconds (newValue, oldValue) {
        if (newValue <= 0) {
          this.$emit('close')
        }
      }
    }
  }
</script>
