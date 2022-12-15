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
            combatHistory: ''
        }
    },
    methods: {
        getHistory() {
            let test = new Test( store.teamA, store.teamB);
            this.$data.combatHistory = test.combat
            this.winner = test.winner
        },
        async getWinner() {
            let history = {'team_a': this.getTeamString(store.teamA), 'team_b': this.getTeamString(store.teamB), 'winner': this.winner, 'date_time': this.getDate()}
            console.log(history);
            console.log(JSON.stringify(history))
            await fetch("http://localhost:3000/users/history/new/", {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify(history)
            }).catch((err) =>{ console.log('hi'); console.log(err)});
            alert('AND THE WINNER ARE ' + this.winner);
        },
        getTeamString(team) {
            let final = '';
            team.forEach(hero => {
                final = final + hero.name + ' '
            })
            return final;
        },
        getDate() {
            let date = new Date().toJSON();
            date = date.replace('T', ' ');
            date = date.slice(0,19)
            return date;
        }
    },

    setup() {
    }
}
</script>