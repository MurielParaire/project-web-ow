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
            <HistoryTable :history="user.history" @historyprevious="getPreviousHistory" @historynext="getNextHistory">
            </HistoryTable>
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
            <button v-if="showUsers === false" @click="loadUsers" class="orangeOutline">Load users</button>
            <TableVue v-if="showUsers" @load="this.loadUsers" @userprevious="getPreviousUsers" @usernext="getNextUsers"
              :users="users" @close="showUsers = false"></TableVue>
          </section>
          <section id="manager" v-if="this.$data.user.roles.manager === true">
            <h3>Events : </h3>
            <button @click="loadEvents" v-if="showEvents === false" class="orangeOutline">Load events</button>
            <EventTableVue v-if="showEvents" @load="this.loadEvents" @eventprevious="getPreviousEvents"
              @eventnext="getNextEvents" :events="events" @close="showEvents = false"></EventTableVue>
            <button @click="showCreateEvent = true" class="orangeOutline">Create event</button>
            <ModalVue v-if="showCreateEvent" @close="showCreateEvent = false" @submit="createEvent"
              :information="createEventInfo">
            </ModalVue>
          </section>
          <section id="supervisor" v-if="this.$data.user.roles.supervisor === true">
            <h3>Characters : </h3>
            <button @click="loadHeroes" v-if="showHeroes === false" class="orangeOutline">Load heroes</button>
            <HeroTableVue @load="this.loadHeroes" v-if="showHeroes" @heroprevious="getPreviousHeroes"
              @heronext="getNextHeroes" :heroes="heroes" @close="showHeroes = false"></HeroTableVue>
            <button @click="showCreateHero = true" class="orangeOutline">Create character</button>
            <ModalVue v-if="showCreateHero" @close="showCreateHero = false" @submit="createHero"
              :information="createHeroInfo">
            </ModalVue>
          </section>
        </section>
      </section>
    </section>
  </section>

</template>

<script>
/**
 * Description: accessible only to connected users; contains all their information and teh tables of the other users, their history, the events and heroes (if they are allowed)
 * */

import HistoryTable from '../components/HistoryTable.vue'
import { getUserInformation, getSomeUsers, getUserHistory } from '../database/User.js';
import ModalVue from '../components/Moda.vue';
import TableVue from '../components/UserTable.vue';
import EventTableVue from '../components/EventTable.vue';
import { getSomeEvents, createEvent, getEventTypes } from '../database/Event.js';
import { getSomeHeroes, createHero } from '../database/Character.js'
import HeroTableVue from '../components/HeroTable.vue';
import UserInformation from '../components/UserInformation.vue'
import { roles } from '../assets/enum/info.js'

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
      //the information concerning the connected user
      user: '',
      //information containing the lists of users / events / heroes
      users: [],
      events: [],
      heroes: [],
      eventOffset: 0,
      eventLimit: 10,
      userOffset: 0,
      userLimit: 5,
      heroOffset: 0,
      heroLimit: 10,
      historyLimit: 10,
      historyOffset: 0,
      showCreateHero: false,
      showCreateEvent: false,
      createHeroInfo: 0,
      createEventInfo: 0,
      showUsers: false,
      showEvents: false,
      showHeroes: false
    }
  },
  methods: {
    //initialise our data
    async initEventInfo() {
      let types = await getEventTypes();
      this.$data.createEventInfo = {
        title: 'Create a new Event',
        attributes: [
          {
            name: 'type',
            input: 'dropdown',
            options: types,
            required: true,
            placeholder: 'Choose a type :',
            value: '',
            max: 10
          },
          {
            name: 'description',
            input: 'textarea',
            required: true,
            placeholder: 'must contain at least one $ followed by a number which specifies the placement of a character \n Example : $1 has killed $2',
            value: '',
            max: 200
          },
          {
            name: 'character',
            input: 'input',
            required: false,
            placeholder: 'Mercy',
            value: '',
            max: 20
          }
        ]
      };
    },
    async initHeroInfo() {
      this.$data.createHeroInfo = {
        title: 'Create a new Hero',
        attributes: [
          {
            name: 'name',
            input: 'input',
            required: true,
            placeholder: 'Mercy',
            value: '',
            max: 20
          },
          {
            name: 'role',
            input: 'dropdown',
            options: roles,
            required: true,
            placeholder: 'Choose a role :',
            value: '',
            max: 8
          },
          {
            name: 'description',
            input: 'textarea',
            required: false,
            placeholder: 'Mercy is a versatile healer who ...',
            value: '',
            max: 350
          },
          {
            name: 'image',
            input: 'textarea',
            required: false,
            placeholder: 'https://...',
            value: '',
            max: 200
          }
        ]
      };
    },
    async loadHistory() {
      this.$data.user.history = [];
      let history = await getUserHistory(this.$data.historyLimit, this.$data.historyOffset);
      for (let counter = 0; counter < history.length; counter++) {
        if (history[counter].winner === 'A') {
          history[counter].a = 'winner';
          history[counter].b = 'loser';
        }
        else {
          history[counter].b = 'winner';
          history[counter].a = 'loser';
        }
        let date = (history[counter].date_time).toString();
        date = date.replace('T', ' ');
        date = date.slice(0, 19);
        history[counter].date_time = date;
      }
      this.$data.user.history = history;
    },
    async getUserInfo() {
      let data = await getUserInformation();
      this.$data.user = data;
      await this.loadHistory();
    },
    async loadUsers() {
      this.$data.users = [];
      this.$data.users = await getSomeUsers(this.$data.userLimit, this.$data.userOffset);
      this.$data.showUsers = true;
    },
    async loadEvents() {
      this.$data.events = [];
      this.$data.events = await getSomeEvents(this.$data.eventLimit, this.$data.eventOffset);
      this.$data.showEvents = true;
    },
    async loadHeroes() {
      this.$data.heroes = [];
      this.$data.heroes = await getSomeHeroes(this.$data.heroLimit, this.$data.heroOffset);
      this.$data.showHeroes = true;
    },
    getNextHistory() {
      if (this.$data.user.history.length === this.$data.historyLimit) {
        this.$data.historyOffset = this.$data.historyOffset + this.$data.historyLimit;
        this.loadHistory();
      }
    },
    getPreviousHistory() {
      if (this.$data.historyOffset === 0) {
        return 0;
      }
      this.$data.historyOffset = this.$data.historyOffset - this.$data.historyLimit;
      if (this.$data.historyOffset < 0) {
        this.$data.historyOffset = 0;
      }
      this.loadHistory();
    },
    getNextEvents() {
      if (this.$data.events.length === this.$data.eventLimit) {
        this.$data.eventOffset = this.$data.eventOffset + this.$data.eventLimit;
        this.loadEvents();
      }
    },
    getPreviousEvents() {
      if (this.$data.eventOffset === 0) {
        return 0;
      }
      this.$data.eventOffset = this.$data.eventOffset - this.$data.eventLimit;
      if (this.$data.eventOffset < 0) {
        this.$data.eventOffset = 0;
      }
      this.loadEvents();
    },
    getNextUsers() {
      if (this.$data.users.length === this.$data.userLimit) {
        this.$data.userOffset = this.$data.userOffset + this.$data.userLimit;
        this.loadUsers();
      }
    },
    getPreviousUsers() {
      if (this.$data.userOffset === 0) {
        return 0;
      }
      this.$data.userOffset = this.$data.userOffset - this.$data.userLimit;
      if (this.$data.userOffset < 0) {
        this.$data.userOffset = 0;
      }
      this.loadUsers();
    },
    getNextHeroes() {
      if (this.$data.heroes.length === this.$data.heroLimit) {
      this.$data.heroOffset = this.$data.heroOffset + this.$data.heroLimit;
      this.loadHeroes();
      }
    },
    getPreviousHeroes() {
      if (this.$data.heroOffset === 0) {
        return 0;
      }
      this.$data.heroOffset = this.$data.heroOffset - this.$data.heroLimit;
      if (this.$data.heroOffset < 0) {
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
      if (event.type === '') {
         await alert('Please select a type.');
         return 0;
      }
      let res = await createEvent(event);
      if (res !== 0) {
        this.$data.showCreateEvent = false;
        this.loadEvents();
      }
    },
    async createHero() {
      let hero = {
        name: this.createHeroInfo.attributes[0].value,
        role: this.createHeroInfo.attributes[1].value,
        description: this.createHeroInfo.attributes[2].value,
        image: this.createHeroInfo.attributes[3].value
      };
      if (hero.role === '') {
         await alert ('please choose a role');
         return 0;
      }
      if (hero.name === '') {
         await alert ('please input a name');
         return 0;
      }
      let res = await createHero(hero);
      if (res !== 0) {
        this.$data.showCreateHero = false;
        this.loadHeroes();
      }
    },
  },
  async mounted() {
    await this.getUserInfo();
    this.initEventInfo();
    this.initHeroInfo();
  }
}
</script>

<style scoped>
h2 {
  font-size: x-large;
  font-weight: bold;
}


#Historytable {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

#admin {
  width: 100%;
}

.Home {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(237, 237, 237);
}
</style>
