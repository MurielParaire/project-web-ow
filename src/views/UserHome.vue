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
        <HistoryTable></HistoryTable>
      </section>
    </section>
  </section>

</template>

<script>
import HistoryTable from '../components/HistoryTable.vue'


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
    async getUserInfo(token) {
      let url = 'http://localhost:3000/owapi/users/token/';
      let fetchResult = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "authorization": token.toString()
        },
      }).catch((err) => console.log(err));
      let data = await fetchResult.json();
      this.$data.user = data;
    }
  },
  mounted() {
    this.$data.user = this.getUserInfo(JSON.parse(sessionStorage.getItem('token')));
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
  font-size:x-large;
  font-weight: bold;
}

#History {
  grid-column: 2;
}

.Home {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(237, 237, 237);
}
</style>