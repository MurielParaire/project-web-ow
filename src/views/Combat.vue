<template>
    <h1>The combat</h1>

    <div v-for="(combat, index) in this.$data.combatHistory" :key="index">
        <Event :event="combat"></Event>
    </div>

    <button @click="getWinner">Finish</button>
</template>

<script>
import Test from '../test';
import { store } from '../stores/store.js';
import Event from '../components/Event.vue';
import { authstore } from '../stores/auth.js';
import { createUserHistory } from '../database/User.js';

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
            if (authstore.getters.isConnected === true) {
                let history = { "team_a": this.getTeamString(store.teamA), "team_b": this.getTeamString(store.teamB), "winner": this.winner, "date_time": this.getDate() };
                let res = await createUserHistory(history);
                if (res === 200) {
                    alert("AND THE WINNER ARE " + this.winner);
                }
                else {
                    alert("Network error. Could not add this match to your history. \nAND THE WINNER ARE " + this.winner);
                }
            }
            else {
                alert("AND THE WINNER ARE " + this.winner);
            }
            
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