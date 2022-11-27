<template>
    <ul >
        <li><Support @setSupport="setSupportA" :AllSupports="AllSupports" ></Support></li>
        <li><Support @setSupport="setSupportB" :AllSupports="AllSupports" ></Support></li>
        <li><DPS @setDPS="setDPSA" :AllDPS="AllDPS" ></DPS></li>
        <li><DPS @setDPS="setDPSB" :AllDPS="AllDPS" ></DPS></li>
        <li> <Tank @setTank="setTank" ></Tank></li>
    </ul>
</template>

<script>
import Support from '../components/Support.vue'
import Tank from '../components/Tank.vue'
import DPS from '../components/DPS.vue'
import { Supports, DPSs } from '../assets/enum/Heroes.js'
export default {
  name: 'team',
  data() {
    return {
        tank : '',
        supportA : '',
        supportB : '',
        DPSA : '', 
        DPSB : '',
        AllSupports: Supports,
        AllDPS: DPSs
    }
  },
  props() {

  },
  components: {
    Support,
    DPS,
    Tank
  },
  methods: {
    setTank(tank) {
        this.$data.tank = tank;
    },
    setSupportA(support) {
      if (this.$data.supportA !== '') {
        this.$data.AllSupports.push(this.$data.supportA)
      }
        this.$data.supportA = support;
        this.removeSupport(support)
    },
    setSupportB(support) {
      if (this.$data.supportB !== '') {
        this.$data.AllSupports.push(this.$data.supportB)
      }
        this.$data.supportB = support;
      this.removeSupport(support)
    },
    removeSupport(support) {
      for (let counter = 0; counter < this.$data.AllSupports.length; counter++) {
          if (this.$data.AllSupports[counter] === support) {
            this.$data.AllSupports.splice(counter, 1)
          }
        }
    },
    setDPSA(dps) {
      if (this.$data.DPSA !== '') {
        this.$data.AllDPS.push(this.$data.DPSA)
      }
        this.$data.DPSA = dps;
        this.removeDPS(dps)
    },
    setDPSB(dps) {
      if (this.$data.DPSB !== '') {
        this.$data.AllDPS.push(this.$data.DPSB)
      }
        this.$data.DPSB = dps;
      this.removeDPS(dps)
    },
    removeDPS(dps) {
      for (let counter = 0; counter < this.$data.AllDPS.length; counter++) {
          if (this.$data.AllDPS[counter] === dps) {
            this.$data.AllDPS.splice(counter, 1)
          }
        }
    }
  }
}
</script>

<style>
ul {
    list-style: none;
}


</style>