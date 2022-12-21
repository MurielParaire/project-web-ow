<template>
        <td :class="this.history.a" >{{ this.history.team_a }}</td>
        <td :class="this.history.b">{{ this.history.team_b }}</td>
        <td>{{ this.history.date_time }}</td>
</template>

<script>

export default {
  name: 'HistoryTable',
  props: {
    history: {
        required: true
    }
  }
}

</script>

<style scoped>
.winner {
    background-color: rgb(198, 242, 198);
}

.loser {
    background-color: rgb(243, 148, 148);
}
</style>