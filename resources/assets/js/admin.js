'use strict'

import Vue from 'vue'
import Buefy from 'buefy'

import axios from 'axios'

import components from '../../components/admin'

require('promise.prototype.finally').shim()

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.http = Vue.prototype.$http = axios.create({
  baseURL: location.origin
})

const app = new Vue({
  components,

  el: '#app',

  data () {
    return {
      ui: {
        nav: {
          sideBarActive: false
        },

        modal: {
          showLoginPrompt: true
        },

        button: {
          fbLoginDisabled: false,
          quickPostLoading: false
        }
      },
    }
  },

  methods: {
    toggleSideBar: function () {
      this.ui.nav.sideBarActive = !this.ui.nav.sideBarActive
    },

    closeOverlays: function () {
      this.ui.nav.sideBarActive = false
    }
  }
})
