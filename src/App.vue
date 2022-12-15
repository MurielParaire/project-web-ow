<template>

<NavBarVue></NavBarVue>

</template>

<script>
import NavBarVue from './components/NavBar.vue';




export default {
    name: "App",
    components: {
      NavBarVue
    },/*
    beforeMount() {
      console.log(sessionStorage);
      window.addEventListener("load", this.onLoad);
      window.addEventListener("beforeunload", this.onUnload);
    },
    beforeUnmount() {
      window.removeEventListener("load", this.onLoad);
      window.removeEventListener("beforeunload", this.onUnload);
    },
     methods: {
      onLoad() {
        window.sessionStorage.setItem("isMySessionActive", true);
      },
      onUnload() {
        window.sessionStorage.clear()
    }
  },*/
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 90px;
  color: black;
}
</style>
