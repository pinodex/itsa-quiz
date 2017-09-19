<template>
  <div class="user">
    <figure class="image is-128x128 avatar">
      <img :src="'//graph.facebook.com/' + model.fbid + '/picture?height=256&amp;width=256'">
    </figure>

    <p class="name">{{ model.name }}</p>
  </div>
</template>

<style lang="scss">
  .user {
    .avatar {
      border-radius: 100%;
      overflow: hidden;

      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      background: #fff;
    }

    .name {
      margin-top: 1rem;
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
