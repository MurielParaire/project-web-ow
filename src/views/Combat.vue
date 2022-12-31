<template>
    <h1>The combat</h1>

    <section class="col-sm-3">
        <h3 class="blue">Team A :</h3>
        <ul id="TeamA" class="Teams">
            <li v-for="hero in this.$data.TeamA" :key="hero.name">
                <img v-if="hero.alive === true" :src="hero.image" :alt="'image of ' + hero.name" />
                <img v-else :src="hero.image" :alt="'image of ' + hero.name" class="dead" />
                <p>{{ hero.name }}</p>
            </li>
        </ul>
    </section>

    <section class="col-sm-6">
        <div v-for="(combat, index) in this.$data.combatHistory" :key="index">
            <Event :event="combat"></Event>
        </div>
    </section>

    <section class="col-sm-3">
        <h3 class="red">Team B :</h3>
        <ul id="TeamB" class="Teams">
            <li v-for="hero in this.$data.TeamB" :key="hero.name">
                <img v-if="hero.alive === true" :src="hero.image" :alt="'image of ' + hero.name" />
                <img v-else :src="hero.image" :alt="'image of ' + hero.name" class="dead" />
                <p>{{ hero.name }}</p>
            </li>
        </ul>
    </section>

    <section class="row">
        <button @click="getWinner">Finish</button>
    </section>
</template>

<script>
import Test from '../combat/main.js';
import { store } from '../stores/store.js';
import Event from '../components/Event.vue';
import { authstore } from '../stores/auth.js';
import { createUserHistory } from '../database/User.js';
import { getEventsByHero} from '../database/Event.js'

export default {
    name: "Combat",
    mounted() {
        this.getHistory();
    },
    data() {
        return {
            combatHistory: [],
            TeamA: [],
            TeamB: []
        };
    },
    methods: {
        async getHistory() {
            try {
                let events = await getEventsByHero(0);
                console.log('events')
                console.log(events)
                let test = new Test(store.teamA, store.teamB, events);
                this.$data.combatHistory = test.combat;
                this.$data.TeamA = test.teams[0].team,
                this.$data.TeamB = test.teams[1].team,
                this.winner = test.winner;
            }
            catch (err) {
                alert('Sorry but there was an error.')
            }
        },
        async getWinner() {
            if (authstore.getters.isConnected === true) {
                let history = { "team_a": this.getTeamString(store.teamA), "team_b": this.getTeamString(store.teamB), "winner": this.winner, "date_time": this.getDate() };
                let res = await createUserHistory(history);
                if (res === 200) {
                    alert("And the winner is Team " + this.winner);
                    this.$router.push({
                        name: "UserHome"
                    });
                }
                else {
                    alert("Network error. Could not add this match to your history. \nAND THE WINNER ARE " + this.winner);
                }
            }
            else {
                alert("And the winner is Team " + this.winner);
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

<style scoped>
.dead {
    filter: grayscale();
}

h3 {
    text-align: left;
}

#TeamA {
    justify-content: start;
}

#TeamA>li {
    text-align: left;
    justify-content: left;
    align-items: left;
}

#TeamB {
    justify-content: end;
}

#TeamB>li {
    margin-left: 60%;
    text-align: left;
    justify-content: left;
    align-items: left;
}

li {
    margin-top: 10px;
    display: flex;
    vertical-align: middle;
}

p {
    margin-top: auto;
    margin-bottom: auto;
    max-width: fit-content;
    max-height: fit-content;
}

img {
    max-width: 50px;
    max-height: 50px;
}

.red {
    color: rgb(255, 95, 95);
    text-align: end;
    margin-right: 25%;
}

.blue {
    color: rgb(63, 141, 243);
}
</style>