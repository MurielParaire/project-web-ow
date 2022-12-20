<template>
    <h1>The combat</h1>

    <div v-for="(combat, index) in this.$data.combatHistory" :key="index">
        <Event :event="combat"></Event>
    </div>

    <button @click="getWinner">Finish</button>
</template>

<script>
import Test from '../test';
import { store } from '../stores/store';
import Event from '../components/Event.vue';

export default {
    name: "Combat",
    mounted() {
        this.getHistory();
    },
    data() {
        return {
            combatHistory: ""
        };
    },
    methods: {
        getHistory() {
            let test = new Test(store.teamA, store.teamB);
            this.$data.combatHistory = test.combat;
            this.winner = test.winner;
        },
        async getWinner() {
            let history = { "team_a": this.getTeamString(store.teamA), "team_b": this.getTeamString(store.teamB), "winner": this.winner, "date_time": this.getDate() };
            await fetch("http://localhost:3000/owapi/users/history/new/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("token")
                },
                body: JSON.stringify(history)
            }).catch((err) => { console.log(err); });
            alert("AND THE WINNER ARE " + this.winner);
        },
        getTeamString(team) {
            let final = "";
            team.forEach(hero => {
                final = final + hero.name + " ";
            });
            return final;
        },
        getDate() {
            let date = new Date().toJSON();
            date = date.replace("T", " ");
            date = date.slice(0, 19);
            return date;
        }
    },
    setup() {
    },
    components: { Event }
}
</script>