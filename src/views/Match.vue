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
            <button @click="startMatch">Start Match</button>
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
            teamA: ['', '', '','',''],
            teamB: ['', '', '','',''],
            names: ''
        }
    },
    components: {
        Team
    },
    methods: {
        setTeamA(team) {
            this.teamA = team;
        },
        setTeamB(team) {
            this.teamB = team;
        },
        verifyTeamIntegrity(team) {
            if (team.length < 5) {
                alert('Please select all heroes on both teams to continue.')
                return 0;
            }
            team.forEach(hero => {
                if (hero.length < 3) {
                    alert('Please select all heroes on both teams to continue.')
                    return 0;
                }
            });
            return 1;
        },
        getTeam(team) {
            return [team.supportA, team.supportB, team.DPSA, team.DPSB, team.tank];
        },
        async startMatch() {
            let TeamA = this.getTeam(this.$data.teamA);
            let TeamB = this.getTeam(this.$data.teamB);
           
            if (this.verifyTeamIntegrity(TeamA) === 0 || this.verifyTeamIntegrity(TeamB) === 0) {
                return 0;
            }
            await store.setTeamA(TeamA)
            await store.setTeamB(TeamB)
            console.log('hi')
            let data = {
                description: this.getNames()
            };
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


<style scoped>
@import'~bootstrap/dist/css/bootstrap.css';

.grid {
    display: grid;
    grid-gap: 10px;
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