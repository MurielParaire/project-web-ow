<template>
    <ul >
        <li><Support></Support></li>
        <li> <Tank :tank="value" ></Tank>{{tank}}</li>
    </ul>
</template>

<script>
import Support from '../components/Support.vue'
import Tank from '../components/Tank.vue'
export default {
  name: 'team',
  data() {
    return {
        tank : ''
    }
  },
  props() {

  },
  components: {
    Support,
    Tank
  }
}
</script>

<style>
ul {
    list-style: none;
}
</style>