<template>
    <section class="container grid">
        <div class="row1">
            <h1>Match</h1>
        </div>
        

        <section class="col-left">
            <h2>Team A : </h2>
            <Team></Team>
        </section>
        <section class="col-right">
            <h2>Team B : </h2>
           <Team></Team>
        </section>

        <b-button variant="outline-danger">Danger</b-button>
    </section>
</template>

<script>
import Team from '../components/Team.vue';

export default {
    name: 'match',
    components: {
        Team
    }
}

</script>


<style scooped>
.grid {
    display: grid;
    grid-gap: 10px;
}

.row1 {
    grid-row: 1;
    grid-column:span 2;
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