<template>

<NavBarVue></NavBarVue>

</template>

<script>
import NavBarVue from './components/NavBar.vue';

export default {
    name: "App",
    components: {
      NavBarVue
    }
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
