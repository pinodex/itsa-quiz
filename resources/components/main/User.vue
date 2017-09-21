<template>
    <div class="columns is-mobile">
      <div class="column has-text-centered">
        <div class="stat">
          <p class="heading">Score</p>
          <p class="title">500</p>
        </div>
      </div>

      <div class="column has-text-centered">
        <div class="user">
          <figure class="image is-128x128 avatar">
            <img :src="'//graph.facebook.com/' + model.fbid + '/picture?height=256&amp;width=256'">
          </figure>

          <p class="name">{{ model.name }}</p>
        </div>
      </div>

      <div class="column has-text-centered">
        <div class="stat">
          <p class="heading">Rank</p>
          <p class="title">#2</p>
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
    props: ['model'],

    data () {
      return {

      }
    }
  }
</script>
