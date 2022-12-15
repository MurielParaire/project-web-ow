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
        <table id="tableHistory">
                <tr>
                    <th>Team A</th>
                    <th>Team B</th>
                    <th>Winner</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                <tr>
                    <td>d</td>
                    <td>d</td>
                    <td>d</td>
                    <td>d</td>
                    <td>d</td>
                </tr>
            </table>
      </section>
    </section>
  </section>

</template>

<script>



export default {
  data() {
    return {
      user: ''
    }
  },
  methods: {
    async getUserInfo(token) {
      let url = 'http://localhost:3000/token/' + token.toString();
      let fetchResult = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).catch((err) => console.log(err));
      console.log(fetchResult)
      let data = await fetchResult.json();
      console.log(data)
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