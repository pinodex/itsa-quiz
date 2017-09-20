<template>
  <div class="card question">
    <div class="card-content">
      <h2 class="subtitle">Question</h2>

      <div class="content">
        {{ model.text }}
      </div>

      <hr />

      <ul class="choices">
        <li>Test choice</li>
        <li>Test choice</li>
        <li>Test choice</li>
        <li>Test choice</li>
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
    props: ['model'],

    data () {
      return {

      }
    }
  }
</script>
