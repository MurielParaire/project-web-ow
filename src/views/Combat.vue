<template>
    <section class="row">
        <h1>The combat</h1>
    </section>
    <section class="row grid">
        <section class="colTA">
            <h3 class="blue">Team A :</h3>
            <ul id="TeamA" class="Teams">
                <li v-for="hero in this.$data.TeamA" :key="hero.name">
                    <img v-if="hero.alive === true" :src="hero.image" :alt="'image of ' + hero.name" />
                    <img v-else :src="hero.image" :alt="'image of ' + hero.name" class="dead" />
                    <p>{{ hero.name }}</p>
                </li>
            </ul>
        </section>

        <section class="colM">
            <div v-for="(combat, index) in this.$data.combatHistory" :key="index">
                <Event :event="combat"></Event>
            </div>
        </section>

        <section class="colTB">
            <h3 class="red">Team B :</h3>
            <ul id="TeamB" class="Teams">
                <li v-for="hero in this.$data.TeamB" :key="hero.name">
                    <img v-if="hero.alive === true" :src="hero.image" :alt="'image of ' + hero.name" />
                    <img v-else :src="hero.image" :alt="'image of ' + hero.name" class="dead" />
                    <p>{{ hero.name }}</p>
                </li>
            </ul>
        </section>
    </section>
    <section class="row">
        <button @click="getWinner" class="orangeOutline">Finish</button>
    </section>
</template>

<script>
import Test from '../combat/main.js';
import { matchstore } from '../stores/trans.js';
import Event from '../components/Event.vue';
import { authstore } from '../stores/auth.js';
import { createUserHistory } from '../database/User.js';
import { getEventsByHero } from '../database/Event.js'

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
                let test = new Test(matchstore.getters.getTeamA, matchstore.getters.getTeamB, events);
                this.$data.combatHistory = test.combat;
                this.$data.TeamA = test.teams[0].team,
                    this.$data.TeamB = test.teams[1].team,
                    this.winner = test.winner;
            }
            catch (err) {
                alert('Sorry but there was an error.')
                this.$router.push({
                    name: "Match"
                });
            }
        },
        async getWinner() {
            if (authstore.getters.isConnected === true) {
                let history = { "team_a": this.getTeamString(matchstore.getters.getTeamA), "team_b": this.getTeamString(matchstore.getters.getTeamB), "winner": this.winner, "date_time": this.getDate() };
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

.grid {
    display: grid;
}

.colTA {
    grid-column: 1;
}

.colM {
    grid-column: 2;
}

.colTB {
    grid-column: 3;
}

@media (max-width:800px) {
    .grid {
        display: flex;
        flex-direction: column;
    }

    .colTA {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        order: 2;
    }

    .colM {
        order: 1;
    }

    .colTB {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        order: 3;
    }

    #TeamB>li {
        margin-left: 0;
    }

}
</style>