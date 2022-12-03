<template>
    <section class="container grid">
        <div class="row1">
            <h1>Match</h1>
        </div>


        <section class="col-left">
            <h2>Team A : </h2>
            <Team @setTeam="setTeamA"></Team>
        </section>
        <section class="col-right">
            <h2>Team B : </h2>
            <Team @setTeam="setTeamB"></Team>
        </section>
        
        <div >
            <button @click="handleClick">Start Match</button>
        </div>
    </section>
</template>

<script>
import Team from '../components/Team.vue';
import {store} from '../stores/store.js'

export default {
    name: 'match',
    data() {
        return {
            teamA: [],
            teamB: [],
            names: ''
        }
    },
    components: {
        Team
    },
    methods: {
        setTeamA(team) {
            store.setTeamA(team)
        },
        setTeamB(team) {
            store.setTeamB(team)
        },
        handleClick() {
            let data = {
                description: this.getNames()
            };
            console.log(data)
            this.$router.push({
                name: "Combat",
                params: { data }
            });
        },
        getNames() {
            let TA = '';
            let TB = '';
            if (store.teamA.length === store.teamB.length) {
                for(let counter = 0; counter < store.teamA.length; counter++) {
                    TA = TA + store.teamA[counter].name;
                    TB = TB + store.teamB[counter].name;
                }
            }
            let final = TA + '&' + TB;
            return final
        }
    }
}

</script>


<style scooped>
@import'~bootstrap/dist/css/bootstrap.css';

.grid {
    display: grid;
    grid-gap: 10px;
    padding-top: 3em;
}

.row1 {
    grid-row: 1;
    grid-column: span 2;
    justify-content: center;
}


.col-left {
    grid-row: 2;
    grid-column: 1;
}

.col-right {
    grid-row: 2;
    grid-column: 2;
}

.startMatch {
    grid-row: 3;
    grid-column: span 2;
    justify-content: center;
}
</style>