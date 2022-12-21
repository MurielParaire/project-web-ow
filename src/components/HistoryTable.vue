<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table mb-0">
            <thead>
                <tr>
                    <th>Team A</th>
                    <th>Team B</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="history in this.history" :key="history.date_time">
                    <HistoryLine :history="history"></HistoryLine>
                </tr>
            </tbody>
        </table>
    </section>

</template>

<script>
import HistoryLine from './HistoryLine.vue';


export default {
    name: "HistoryTable",
    props: {
        history: {
            required: true
        }
    },
    components: { HistoryLine }
}
</script>

<style>
thead {
    background-color: #218ffe;
    color: white;
    top: 0;
    position: sticky;
}

th {
    text-align: center;
}

.tab {
    width: 90%;
    border-radius: 10px;
}

td {
    background-color: whitesmoke;
}
</style>