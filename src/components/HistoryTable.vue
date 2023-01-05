<template>
    <section class="around">
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
                    <td :class="history.a">{{ history.team_a }}</td>
                    <td :class="history.b">{{ history.team_b }}</td>
                    <td>{{ history.date_time }}</td>
                </tr>
            </tbody>
        </table>

    </section>
    <button class="previous blueoutline" @click="$emit('historyprevious')">Previous</button>
    <button class="next blueoutline" @click="$emit('historynext')">Next</button>
    </section>
</template>

<script>



export default {
    name: "HistoryTable",
    props: {
        history: {
            required: true
        }
    },
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
    width: 100%;
    border-radius: 10px;
}

td {
    background-color: whitesmoke;
}

.winner {
    background-color: rgb(198, 242, 198);
}

.loser {
    background-color: rgb(243, 148, 148);
}
</style>