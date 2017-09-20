<template>
  <i class="cloud fa fa-cloud"
    :class="classObject"
    :style="styleObject"

    @click="onClick"></i>
</template>

<style lang="scss">
  .cloud {
    position: absolute;

    color: rgba(255, 255, 255, 0.5);
    font-size: 3rem;

    &.is-selected {
      color: #fff;
      z-index: 100;
    }

    &.is-small {
      font-size: 3rem;
    }

    &.is-medium {
      font-size: 5rem;
    }

    &.is-large {
      font-size: 7rem;
    }
  }
</style>

<script>
  export default {
    props: {
      size: {
        type: String,
        required: true
      },

      velocity: {
        type: Number,
        required: true
      },

      x: {
        type: Number,
        default: 0
      },

      y: {
        type: Number,
        default: 0
      },

      selected: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {

      }
    },

    computed: {
      classObject () {
        let classes = [`is-${this.size}`]

        if (this.selected) {
          classes.push('is-selected')
        }

        return classes
      },

      styleObject () {
        let top = this.y,
            left = this.x

        if (top > 150 || left > 150) {
          this.$emit('end')
        }

        return {
          top: `${top}%`,
          left: `${left}%`,
        }
      }
    },

    methods: {
      onClick () {
        this.$emit('click')
      }
    }
  }
</script>
