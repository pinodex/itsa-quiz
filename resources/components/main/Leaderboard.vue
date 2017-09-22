<template>
  <section class="leaderboard">
    <div class="container">
      <div class="level is-mobile">
        <div class="level-left">
          <h2 class="subtitle">
            <span class="icon">
              <i class="fa" :class="{ 'fa-trophy': users.length, 'fa-refresh': !users.length, 'fa-spin': !users.length }"></i>
            </span>

            <span>Leaderboard</span>
          </h2>
        </div>

        <div class="level-right">
          <small class="has-text-grey">
            <i class="fa fa-star"></i> /
            <i class="fa fa-thumbs-up"></i> /
            <i class="fa fa-thumbs-down"></i>
          </small>
        </div>
      </div>

      <hr />

      <transition-group name="fade">
        <article class="media is-vcentered" :key="user.id" v-for="user in users">
          <figure class="media-left image avatar">
            <img :src="'//graph.facebook.com/' + user.fbid + '/picture?height=54&amp;width=54'" />
          </figure>

          <div class="media-content">
            <div class="content">
              <p class=" name is-size-5 is-marginless">{{ user.name }}</p>
              <p class="points">{{ user.score }} / {{ user.correct_count }} / {{ user.incorrect_count }}</p>
            </div>
          </div>
        </article>
      </transition-group>
    </div>
  </section>
</template>

<style lang="scss">
  $small-breakpoint: 400px;

  .leaderboard {
    background: #fff;
    height: 100%;

    padding: 1.5rem;

    .data {

    }

    .avatar {
      border-radius: 100%;
      overflow: hidden;

      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      background: #fff;

      height: 54px;
      width: 54px;

      @media (max-width: $small-breakpoint) {
        height: 42px;
        width: 42px;
      }
    }

    .skeleton-image {
      background: #eee;
      height: 100%;
      width: 100%;
    }

    @media (max-width: $small-breakpoint) {
      .name {
        font-size: 1rem !important;
      }

      .points {
        font-size: 0.8rem;
      }
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        users: []
      }
    },

    mounted () {
      this.$http.get('api/quiz/leaderboard')
        .then(response => {
          this.users = response.data
        })
    }
  }
</script>
