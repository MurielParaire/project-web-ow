<template>

  <section class="Home">

    <h1>Home</h1>
    <section class="HomePage">
      <section class="row">
        <section id="User" class="col-sm-4">
          <UserInformation :user="user" @load="getUserInfo"></UserInformation>
        </section>
        <section id="History" class="col-sm-8">
          <h2>History</h2>
          <section id="Historytable">
            <HistoryTable :history="user.history"></HistoryTable>
          </section>
        </section>
      </section>
      <section class="row">
      <section v-if="this.$data.user === ''">
        <p>Loading ... </p>
      </section>
      <section id="specialrole" v-else>
        <section id="admin" v-if="this.$data.user.roles.admin === true">
          <h3>Users : </h3>
          <button @click="loadUsers">load users</button>
          <TableVue v-if="showUsers"  @load="this.loadUsers" @userprevious="getPreviousUsers" @usernext="getNextUsers" :users="users" @close="showUsers = false"></TableVue>
        </section>
        <section id="manager" v-if="this.$data.user.roles.manager === true">
          <h3>Events : </h3>
          <button @click="loadEvents">load events</button>
          <EventTableVue v-if="showEvents" @load="this.loadEvents"  @eventprevious="getPreviousEvents" @eventnext="getNextEvents" :events="events" @close="showEvents = false"></EventTableVue>
          <button @click="showCreateEvent = true">create event</button>
          <ModalVue v-if="showCreateEvent" @close="showCreateEvent = false" @submit="createEvent" :information="createEventInfo">
          </ModalVue>
        </section>
        <section id="supervisor" v-if="this.$data.user.roles.supervisor === true">
          <h3>Characters : </h3>
          <button @click="loadHeroes">load heroes</button>
          <HeroTableVue @load="this.loadHeroes" v-if="showHeroes"  @heroprevious="getPreviousHeroes" @heronext="getNextHeroes" :heroes="heroes" @close="showHeroes = false"></HeroTableVue>
          <button @click="showCreateHero = true">create character</button>
          <ModalVue v-if="showCreateHero" @close="showCreateHero = false" @submit="createHero" :information="createHeroInfo">
          </ModalVue>
        </section>
      </section>
    </section>
    </section>
  </section>

</template>

<script>
import HistoryTable from '../components/HistoryTable.vue'
import { getUserInformation, getSomeUsers } from '../database/User.js';
import ModalVue from '../components/Moda.vue';
import TableVue from '../components/UserTable.vue';
import EventTableVue from '../components/EventTable.vue';
import { getSomeEvents, createEvent } from '../database/Event.js';
import {getSomeHeroes, createHero} from '../database/Character.js'
import HeroTableVue from '../components/HeroTable.vue';
import UserInformation from '../components/UserInformation.vue'

export default {
  components: {
    HistoryTable,
    ModalVue,
    TableVue,
    EventTableVue,
    HeroTableVue,
    UserInformation
  },
  data() {
    return {
      user: '',
      users: [],
      events: [],
      heroes: [],
      eventOffset: 0,
      eventLimit: 10,
      userOffset: 0,
      userLimit: 5,
      heroOffset: 0,
      heroLimit: 10,
      showCreateHero: false,
      showCreateEvent: false,
      createHeroInfo: {
        title: 'Create a new Hero',
        attributes: [
          {
            name: 'name',
            input: 'input',
            required: true,
            placeholder: 'Mercy',
            value: ''
          },
          {
            name: 'role',
            input: 'input',
            required: true,
            placeholder: 'Support',
            value: ''
          },
          {
            name: 'description',
            input: 'textarea',
            required: false,
            placeholder: 'Mercy is a versatile healer who ...',
            value: ''
          },
          {
            name: 'image',
            input: 'textarea',
            required: false,
            placeholder: 'https://...',
            value: ''
          }
        ]
      },
      createEventInfo: {
        title: 'Create a new Event',
        attributes: [
          {
            name: 'type',
            input: 'input',
            required: true,
            placeholder: 'kill',
            value: ''
          },
          {
            name: 'description',
            input: 'textarea',
            required: true,
            placeholder: 'must contain at least one $ followed by a number which specifies the placement of a character \n Example : $1 has killed $2',
            value: ''
          },
          {
            name: 'character',
            input: 'input',
            required: false,
            placeholder: 'Mercy',
            value: ''
          }
        ]
      },
      showUsers: false,
      showEvents: false,
      showHeroes: false
    }
  },
  methods: {
    async getUserInfo() {
      let data = await getUserInformation();
      for (let counter = 0; counter < data.history.length; counter++) {
        if (data.history[counter].winner === 'A') {
          data.history[counter].a = 'winner';
          data.history[counter].b = 'loser';
        }
        else {
          data.history[counter].b = 'winner';
          data.history[counter].a = 'loser';
        }
        let date = (data.history[counter].date_time).toString();
        date = date.replace('T', ' ');
        date = date.slice(0, 19);
        data.history[counter].date_time = date;
      }
      this.$data.user = data;
    },
    async loadUsers() {
      this.$data.users = await getSomeUsers(this.$data.userLimit, this.$data.userOffset);
      this.$data.showUsers = true;
    },
    async loadEvents() {
      this.$data.events = await getSomeEvents(this.$data.eventLimit, this.$data.eventOffset);
      this.$data.showEvents = true;
    },
    async loadHeroes() {
      this.$data.heroes = await getSomeHeroes(this.$data.heroLimit, this.$data.heroOffset);
      this.$data.showHeroes = true;
    },
    getNextEvents() {
      this.$data.eventOffset = this.$data.eventOffset + this.$data.eventLimit;
      this.loadEvents();
    },
    getPreviousEvents() {
      this.$data.eventOffset = this.$data.eventOffset - this.$data.eventLimit;
      if(this.$data.eventOffset < 0) {
        this.$data.eventOffset = 0;
      }
      this.loadEvents();
    },
    getNextUsers() {
      this.$data.userOffset = this.$data.userOffset + this.$data.userLimit;
      this.loadUsers();
    },
    getPreviousUsers() {
      this.$data.userOffset = this.$data.userOffset - this.$data.userLimit;
      if(this.$data.userOffset < 0) {
        this.$data.userOffset = 0;
      }
      this.loadUsers();
    },
    getNextHeroes() {
      this.$data.heroOffset = this.$data.heroOffset + this.$data.heroLimit;
      this.loadHeroes();
    },
    getPreviousHeroes() {
      this.$data.heroOffset = this.$data.heroOffset - this.$data.heroLimit;
      if(this.$data.heroOffset < 0) {
        this.$data.heroOffset = 0;
      }
      this.loadHeroes();
    },
    async createEvent() {
      let event = {
        type: this.createEventInfo.attributes[0].value, 
        description: this.createEventInfo.attributes[1].value, 
        character: this.createEventInfo.attributes[2].value
      }
      let res = await createEvent(event);
      if (res !== 0) {
        this.$data.showCreateEvent = false;
      }
    },
    async createHero() {
      let hero = {
        name: this.createHeroInfo.attributes[0].value, 
        role: this.createHeroInfo.attributes[1].value, 
        description: this.createHeroInfo.attributes[2].value,
        image: this.createHeroInfo.attributes[3].value
      }
      let res = await createHero(hero);
      console.log('res')
      console.log(res)
      if (res !== 0) {
        this.$data.showCreateHero = false;
      }
    }
  },
  async mounted() {
    await this.getUserInfo();
  }
}
</script>

<style scoped>

h2 {
  font-size: x-large;
  font-weight: bold;
}


#Historytable {
  display: flex;
  justify-content: center;
  width: 100%;
}

.Home {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(237, 237, 237);
}
</style>