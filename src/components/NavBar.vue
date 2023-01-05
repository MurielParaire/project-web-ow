<template>

  <router-view> </router-view>
  <nav class="navbar navbar-fixed-top">
    <div class="nav">
      <input type="checkbox" id="nav-check">
      <div class="navbar-header">
        <p class="navbar-oversim">OverSim2</p>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <ul class="nav-links">
        <a><router-link :to="{ name: 'overSim_home' }" class="router-link">Welcome</router-link></a>
        <a><router-link :to="{ name: 'Characters' }" class="router-link">Characters</router-link></a>
        <a><router-link :to="{ name: 'Match' }" class="router-link">Match</router-link></a>
        <a v-if="isConnected"><router-link :to="{ name: 'UserHome' }" class="router-link">Home</router-link></a>
        <a v-if="!isConnected"><router-link :to="{ name: 'Login' }" class="router-link"><img
              src="../assets/images/UserLogo.png" alt="User logo for user page" />Log in</router-link></a>
        <a v-if="isConnected" @click="logout"><router-link :to="{ name: 'overSim_home' }" class=" router-link"><img
              src="../assets/images/UserLogo.png" alt="User logo for user page" />Log out</router-link></a>
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
  mounted() {
    document.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('nav-check').checked = false;
      });
    });
  },
  setup() {
    watch(() => authstore.getters.isConnected, function () { });

    return {
      isConnected: computed(() => authstore.getters.isConnected)
    }
  }

}
</script>

<style scoped>
.navbar-oversim {
  font-size: x-large;
  color: white !important;
  vertical-align: middle;
  text-decoration: none;
  padding-top: 10px;
}

.navbar .nav-links a {
  font-size: 16px;
  color: white;
}

.nav {
  padding: 15px 10px 15px 0px;
  width: 100%;
  background-color: #218ffe;
  position: relative;
}

.nav a img {
  max-width: 50px;
  max-height: 30px;
  padding-bottom: 0;
}

.nav>.nav-header {
  display: inline;
}

.nav>.nav-header>.nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav>.nav-btn {
  display: none;
}

.nav>.nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav>.nav-links>a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav>.nav-links>a:hover,
.nav>.nav-links>a:focus {
  background-color: #218ffe !important;
  text-decoration: underline !important;
}

.nav>#nav-check {
  display: none;
}

@media (max-width:800px) {
  ul {
    margin-top: 10px;
    padding-left: 0;
    margin-left: 0;
  }

  .nav>.nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .nav>.nav-btn>label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding-top: 13px;
  }

  .nav>.nav-btn>label:hover,
  .nav #nav-check:checked~.nav-btn>label {
    background-color: #218ffe;
  }

  .nav>.nav-btn>label>span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }

  .nav>.nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #218ffe;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }

  .nav>.nav-links>a {
    padding-left: 0;
    margin-left: 0;
    display: block;
    width: 100%;
  }

  .nav>#nav-check:not(:checked)~.nav-links {
    height: 0px;
  }

  .nav>#nav-check:checked~.nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>