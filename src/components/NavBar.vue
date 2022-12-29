<template>
  <!-- Navigation Bar -->
  <router-view></router-view>
  <nav class="navbar  navbar-fixed-top">
    <div class="navbar-header">

      <p class="navbar-oversim">OverSim2</p>
    </div>
    <div class="collapse navbar-collapse" id="resNav">
      <ul class="nav navbar-nav navbar-right">
        <li @click="a" ><router-link :to="{ name: 'overSim_home' }" class="router-link">Welcome</router-link></li>
        <li><router-link :to="{ name: 'Characters' }" class="router-link">Characters</router-link></li>
        <li><router-link :to="{ name: 'Match' }" class="router-link">Match</router-link></li>
        <li v-if="isConnected"><router-link :to="{ name: 'UserHome' }" class="router-link">Home</router-link></li>
        <li v-if="!isConnected"><router-link :to="{ name: 'Login' }" class="router-link"><img
              src="../assets/images/UserLogo.png" alt="User logo for user page" />Log in</router-link></li>
        <li  v-if="isConnected" @click="logout"><router-link :to="{ name: 'overSim_home' }" class="router-link"><img
              src="../assets/images/UserLogo.png" alt="User logo for user page" />Log out</router-link></li>
      </ul>
    </div>
  </nav>
  <!-- End of Navigation Bar -->
</template>

<script>
import { authstore } from '../stores/auth.js';
import { watch } from 'vue';
import { computed } from 'vue';

export default {
  methods: {
    logout() {
      authstore.commit('logout')
    },
  },
  setup() {
    watch(() => authstore.getters.isConnected, function () {});

    return {
      isConnected: computed(() => authstore.getters.isConnected)
    }
  }

}
</script>

<style>
/* Navigation Bar */
.navbar {
  padding: 15px 10px 15px 0px;
  background-color: #218ffe;
}

.navbar-oversim {
  font-size: 30px;
  color: white !important;
  font-family: "Mogra";
  text-decoration: none;
}

.navbar .navbar-nav li a {
  font-size: 16px;
  color: white;
}

.nav li img {
  max-width: 50px;
  max-height: 30px;
  padding-bottom: 0;
}

.nav>li>a:hover,
.nav>li>a:focus {
  background-color: #218ffe !important;
  text-decoration: underline !important;

}
</style>