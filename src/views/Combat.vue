<template>
    <h1>The combat</h1>

    <div v-for="(combat, index) in this.$data.combatHistory" :key="index">
        <p> {{ combat }} </p>
    </div>

    <button @click="getWinner">Finish</button>
</template>

<script>
import Test from '../test'
import { store } from '../stores/store';

export default {
    name: "Combat",
    mounted() {
        console.log("A is", store.teamA);
        console.log("B is", store.teamB);
        this.getHistory()
    },
    data() {
        return {
            teamA: [],
            teamB: [],
            combatHistory: ''
        }
    },
    methods: {
        getHistory() {
            let test = new Test( store.teamA, store.teamB);
            this.$data.combatHistory = test.combat
            this.winner = test.winner
        },
        getWinner() {
            alert('AND THE WINNER ARE ' + this.winner)
        }
    },

    setup() {
    }
}
</script>