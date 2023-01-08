<template>
  <ul>
    <li>
      <Support @setSupport="setSupportA" :AllSupports="AllSupports" class="first"></Support>
    </li>
    <li>
      <Support @setSupport="setSupportB" :AllSupports="AllSupports" class="second"></Support>
    </li>
    <li>
      <DPS @setDPS="setDPSA" :AllDPS="AllDPS" class="third"></DPS>
    </li>
    <li>
      <DPS @setDPS="setDPSB" :AllDPS="AllDPS" class="fourth"></DPS>
    </li>
    <li>
      <Tank @setTank="setTank"></Tank>
    </li>
  </ul>
</template>

<script>
/**
 * description : gets 2 Supoorts, 2 DPS' and one Tank to create a team
 */

import Support from '../components/Support.vue'
import Tank from '../components/Tank.vue'
import DPS from '../components/DPS.vue'
import { getHeroesByRole } from '../database/Character.js'


export default {
  name: 'team',
  emits: ['setTeam'],
  data() {
    return {
      AllSupports: [],
      AllDPS: [],
      team: {
        tank: '',
        supportA: '',
        supportB: '',
        DPSA: '',
        DPSB: '',
      }
    }
  },
  components: {
    Support,
    DPS,
    Tank
  },
  methods: {
    /**
     * Description: sets the tank hero of the team
     * Arguments:
     *      - tank : the tank hero the user selected
     * */
    setTank(tank) {
      this.$data.team.tank = tank;
    },

    /**
     * Description: sets the first support hero of the team
     * Arguments:
     *      - support : the support hero the user selected
     * */
    setSupportA(support) {
      if (this.$data.team.supportA !== '') {
        this.$data.AllSupports.push(this.$data.team.supportA)
      }
      this.$data.team.supportA = support;
      this.removeSupport(support)
    },

    /**
     * Description: sets the second support hero of the team
     * Arguments:
     *      - support : the support hero the user selected
     * */
    setSupportB(support) {
      if (this.$data.team.supportB !== '') {
        this.$data.AllSupports.push(this.$data.team.supportB)
      }
      this.$data.team.supportB = support;
      this.removeSupport(support)
    },

    /**
     * Description: removes a support from the commun list so that users can't choose the same hero twice
     * Arguments:
     *      - support : the support hero to remove
     * */
    removeSupport(support) {
      for (let counter = 0; counter < this.$data.AllSupports.length; counter++) {
        if (this.$data.AllSupports[counter] === support) {
          this.$data.AllSupports.splice(counter, 1)
        }
      }
    },

    /**
     * Description: sets the first dps hero of the team
     * Arguments:
     *      - dps : the dps hero the user selected
     * */
    setDPSA(dps) {
      if (this.$data.team.DPSA !== '') {
        this.$data.AllDPS.push(this.$data.team.DPSA)
      }
      this.$data.team.DPSA = dps;
      this.removeDPS(dps)
    },

    /**
     * Description: sets the second dps hero of the team
     * Arguments:
     *      - dps : the dps hero the user selected
     * */
    setDPSB(dps) {
      if (this.$data.team.DPSB !== '') {
        this.$data.AllDPS.push(this.$data.team.DPSB)
      }
      this.$data.team.DPSB = dps;
      this.removeDPS(dps)
    },

    /**
     * Description: removes a dps from the commun list so that users can't choose the same hero twice
     * Arguments:
     *      - dps : the dps hero to remove
     * */
    removeDPS(dps) {
      for (let counter = 0; counter < this.$data.AllDPS.length; counter++) {
        if (this.$data.AllDPS[counter] === dps) {
          this.$data.AllDPS.splice(counter, 1)
        }
      }
    },

    /**
     * Description: calls the parent component to set the value of the team
     * */
    setTeam() {
      this.$emit('setTeam', this.$data.team);
    }
  },
  watch: {
    //whenever one hero of the team changes, the team needs to be updated
    team: {
      handler: function (newTeam) {
        this.$emit('setTeam', newTeam);
      },
      deep: true
    }
  },
  async mounted() {
    //charge all support heroes
    this.$data.AllSupports = await getHeroesByRole('support');
    //charge all dps heroes
    this.$data.AllDPS = await getHeroesByRole('dps');
  }
}
</script>

<style>
ul {
  list-style: none;
}

.first .aselect .selector {
  z-index: 5;
}

.second .aselect .selector {
  z-index: 4;
}

.third .aselect .selector {
  z-index: 3;
}

.fourth .aselect .selector {
  z-index: 2;
}
</style>