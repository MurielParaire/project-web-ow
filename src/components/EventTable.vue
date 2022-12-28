<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table striped mb-0">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Character</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e, index) in this.events" :key="index">
                    <td>{{ e.type }}</td>
                    <td>{{ e.description }}</td>
                    <td>{{ e.name }}</td>
                    <td class="danger" @click="deleteEvent(e)">-</td>
                </tr>
            </tbody>
        </table>
        <button class="previous" @click="$emit('eventprevious')">Previous</button>
        <button class="next" @click="$emit('eventnext')">Next</button>
        <button class="close" @click="$emit('close')">Hide</button>
    </section>

</template>

<script>
import {deleteEventById} from '../database/Event.js'

export default {
    name: "EventTable",
    props: {
        events: {
            required: true
        }
    },
    methods: {
        async deleteEvent(event) {
            console.log(event)
            if (confirm('Are you sure you want to delete the event : ' + event.description)) {
                let result = await deleteEventById(event.event_id);
                if (result !== 0) {
                    alert(event.description + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        }
    }
}
</script>

<style scoped>
.tableHistory {
    width: fit-content;
}

.tab {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

.tab>button {
    margin-top: 15px;
}
</style>