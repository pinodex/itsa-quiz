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
        <article class="media is-vcentered" :key="user.id" v-for="(user, i) in users">
          <figure class="media-left image avatar">
            <img :src="'//graph.facebook.com/' + user.fbid + '/picture?height=54&amp;width=54'" />
          </figure>

          <div class="media-content">
            <div class="content">
              <p class=" name is-marginless">{{ user.name }}</p>
              <p class="points is-size-7">{{ user.score }} / {{ user.correct_count }} / {{ user.incorrect_count }}</p>
            </div>
          </div>

          <div class="media-right">
            <h2 class="subtitle has-text-grey-light">#{{ user.rank }}</h2>
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

    .avatar {
      border-radius: 100%;
      overflow: hidden;

      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      background: #fff;

      height: 48px;
      width: 48px;
    }

    .skeleton-image {
      background: #eee;
      height: 100%;
      width: 100%;
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
