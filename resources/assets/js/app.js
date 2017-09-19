'use strict'

import Vue from 'vue'
import Buefy from 'buefy'

import axios from 'axios'
import ws from 'adonis-websocket-client'

import components from '../../components'
import store from './store'

require('promise.prototype.finally').shim()

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.io = Vue.prototype.$io = ws(location.origin)

Vue.http = Vue.prototype.$http = axios.create({
  baseURL: location.origin
})

const app = new Vue({
  components,
  store,

  el: '#app',

  created () {
    this.$store.subscribe((mutation, state) => {
      this.$emit(`store:${mutation.type}`, state)
    })

    if (window.__USER__) {
      this.$store.dispatch('login', window.__USER__)
    }
  },

  mounted () {
    this.$on('store:LOGOUT', () => {
      FB.getLoginStatus(f => {
        if (f.status === 'connected') {
          FB.logout()
        }
      })
    })
  }
})

window.fbAsyncInit = function() {
  FB.init({
    appId      : APP_ID,
    cookie     : true,
    xfbml      : true,
    version    : 'v2.10'
  });

  app.$emit('fb:init')
};
