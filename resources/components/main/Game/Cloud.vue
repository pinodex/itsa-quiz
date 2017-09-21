<template>
  <i class="cloud fa fa-cloud"
    :class="classObject"
    :style="styleObject"

    @click="onClick"></i>
</template>

<style lang="scss">
  $small-breakpoint: 400px;

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

    @media (max-width: $small-breakpoint) {
      &.is-small {
        font-size: 2rem;
      }

      &.is-medium {
        font-size: 4rem;
      }

      &.is-large {
        font-size: 6rem;
      }
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

      speed: {
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
        return {
          top: `${this.y}%`,
          left: `${this.x}%`,
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
