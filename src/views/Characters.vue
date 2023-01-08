<template>
  <h1>Characters</h1>

  <section class="contentChar">
    <section id="TankList">
      <section id="Tanks">
        <!-- show every support (image, id, name) thanks to v-for -->
        <article v-for="character in this.$data.TankList" :key="character.id" @click="getCharacterDetail(character)">
          <section class="containerChar">
            <Character :character="character"></Character>
          </section>
        </article>
      </section>
    </section>

    <section id="DPSList">
      <section id="DPSs">
        <!-- show every dps (image, id, name) thanks to v-for -->
        <article v-for="character in this.$data.DPSList" :key="character.id" @click="getCharacterDetail(character)">
          <section class="containerChar">
            <Character :character="character"></Character>
          </section>
        </article>
      </section>
    </section>
    <section id="SupportList">
      <section id="Supports">
        <!-- show every support (image, id, name) thanks to v-for -->
        <article v-for="character in this.$data.SupportList" :key="character.id" @click="getCharacterDetail(character)">
          <section class="containerChar">
            <Character :character="character"></Character>
          </section>
        </article>
      </section>
    </section>
  </section>
</template>

<script>
/**
 * Description: the page containing all the heroes
 * */


import { matchstore } from '../stores/store.js';
import Character from '../components/Character.vue'
import { getAllCharacters } from '../database/Character.js';

export default {
  name: 'Characters',
  components: {
    Character
  },
  data() {
    return {
      SupportList: [],
      DPSList: [],
      TankList: []
    }
  },
  methods: {
    /**
     * Description: get all characters
     * */
    async getCharacters() {
      let data = await getAllCharacters()
      for (let counter = 0; counter < data.length; counter++) {
        if (data[counter].role === 'Support') {
          this.$data.SupportList.push(data[counter])
        }
        else if (data[counter].role === 'DPS') {
          this.$data.DPSList.push(data[counter])
        }
        else {
          this.$data.TankList.push(data[counter])
        }
      }
      this.$data.SupportList.sort((a, b) =>
        a.name.localeCompare(b.name));
      this.$data.DPSList.sort((a, b) =>
        a.name.localeCompare(b.name));
      this.$data.TankList.sort((a, b) =>
        a.name.localeCompare(b.name));
    },

    /**
     * Description: get the character information
     * Arguments:
     *      - character : the hero whose information we want to load
     * */
    getCharacterDetail(character) {
      matchstore.commit('setCharacter', character);
      let name = character.name;
      if (name === 'Lúcio') {
        name = 'lucio';
      }
      else if (name === 'Torbjörn') {
        name = 'torbjorn';
      }
      else if (name === 'Junker Queen') {
        name = 'junker-queen';
      }
      else if (name === 'Soldier: 76') {
        name = 'soldier-76';
      }
      else if (name === 'Wrecking Ball') {
        name = 'wrecking-ball';
      }
      else {
        name = name.charAt(0).toLowerCase() + name.slice(1);
      }
      this.$router.push({
        name: "CharacterDetail",
        params: { name }
      });

    }
  },
  async mounted() {
    this.getCharacters()
  }
}
</script>

<style>
.contentChar {
  display: grid;
  column-gap: 5%;
  width: 80%;
  column-width: auto;
  grid-template-columns: 1fr 2fr 1fr;
  margin-left: auto;
  margin-right: auto;
}

#SupportList {
  grid-column: 3;
}

#DPSList {
  grid-column: 2;
}

#TankList {
  grid-column: 1;
}

.containerChar {
  width: 20%;
}

article img {
  max-width: 100px;
}

ul article {
  display: inline-flex;
}

#DPSs,
#Supports,
#Tanks {
  display: inline-flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
}

h1 {
  padding-top: 30px;
  padding-bottom: 10px;
}


@media (max-width:800px) {
  .contentChar {
    width: 95%;
  }

  h1 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>