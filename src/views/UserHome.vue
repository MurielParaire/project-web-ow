<template>

  <section class="Home">

    <h1>Home</h1>
    <section class="HomePage">
      <section id="User">
        <h2> {{ this.$data.user.username }}</h2>
        <p>Last name : {{ this.$data.user.lastname }}</p>
        <p>First name : {{ this.$data.user.firstname }}</p>
        <p>Email : {{ this.$data.user.email }}</p>
      </section>
      <section id="History">
        <h2>History</h2>
        <section id="Historytable">
          <HistoryTable :history="user.history"></HistoryTable>
        </section>
      </section>
    </section>
  </section>

</template>

<script>
import HistoryTable from '../components/HistoryTable.vue'
import { getUserInformation } from '../database/User.js';

export default {
  components: {
    HistoryTable
  },
  data() {
    return {
      user: ''
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
    }
  },
  mounted() {
    this.$data.user = this.getUserInfo();
  }
}
</script>

<style scoped>
.HomePage {
  display: grid;
}

#User {
  grid-column: 1;
}

h2 {
  font-size: x-large;
  font-weight: bold;
}

#History {
  grid-column: 2;
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