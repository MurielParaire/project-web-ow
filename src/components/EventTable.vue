<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table striped mb-0">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Hero</th>
                    <th>modify</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="e in this.events" :key="e.event_id">
                    <td>{{ e.type }}</td>
                    <td>{{ e.description }}</td>
                    <td>{{ e.name }}</td>
                    <td class="warning" @click="openmodifyEvent(e)"><img src="../assets/images/modify.png" alt="png of a pen to modify the event" class="addX"/></td>
                    <td class="danger" @click="deleteEvent(e)"> <img src="../assets/images/x.png" alt="X to close the window" class="deleteX"/></td>
                </tr>
            </tbody>
        </table>
        <button class="previous" @click="$emit('eventprevious')">Previous</button>
        <button class="next" @click="$emit('eventnext')">Next</button>
        <button class="close" @click="$emit('close')">Hide</button>
        <ModaVue v-if="showmodifyEvent" @submit="modifyEventJS" :information="modifyEventInfo" @close="this.$data.showmodifyEvent = false"></ModaVue>
    </section>

</template>

<script>
import { deleteEventById, modifyEvent } from '../database/Event.js'
import ModaVue from './Moda.vue';

export default {
    name: "EventTable",
    components: {
        ModaVue
    },
    data() {
        return {
            showmodifyEvent: false,
            modifyEventInfo: {},
            selectedEvent: {}
        }
    },
    props: {
        events: {
            required: true
        }
    },
    methods: {
        async deleteEvent(event) {
            if (confirm('Are you sure you want to delete the event : ' + event.description)) {
                let result = await deleteEventById(event.event_id);
                if (result !== 0) {
                    alert(event.description + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        },
        openmodifyEvent(event) {
            this.$data.selectedEvent = event;
            this.updateEventInfo(event);
            this.$data.showmodifyEvent = true;
        },
        async modifyEventJS() {
            let event = this.getEvent();
            let res = await modifyEvent(event);
            if (res !== 0) {
                this.$data.showmodifyEvent = false;
            }
        },
        getEvent() {
            let event = this.$data.selectedEvent;
            if (event.type !== this.$data.modifyEventInfo.attributes[0].value && '' !== this.$data.modifyEventInfo.attributes[0].value) {
                event.type = this.$data.modifyEventInfo.attributes[0].value;
            }
            if (event.description !== this.$data.modifyEventInfo.attributes[1].value && '' !== this.$data.modifyEventInfo.attributes[1].value) {
                event.description = this.$data.modifyEventInfo.attributes[1].value;
            }
            if (event.name !== this.$data.modifyEventInfo.attributes[2].value && '' !== this.$data.modifyEventInfo.attributes[2].value) {
                event.name = this.$data.modifyEventInfo.attributes[2].value;
            }
            return event;
        },
        updateEventInfo(event) {
            this.$data.modifyEventInfo.attributes[0].value = event.type;
            this.$data.modifyEventInfo.attributes[0].placeholder = event.type;
            this.$data.modifyEventInfo.attributes[1].value = event.description;
            this.$data.modifyEventInfo.attributes[1].placeholder = event.description;
            this.$data.modifyEventInfo.attributes[2].value = event.name;
            this.$data.modifyEventInfo.attributes[2].placeholder = event.name;
        },
        initEventInfo() {
            this.$data.modifyEventInfo =  {
                title: 'Modify an Event',
                attributes: [
                    {
                        name: 'type',
                        input: 'input',
                        required: true,
                        placeholder: 'kill',
                        value: ''
                    },
                    {
                        name: 'description',
                        input: 'textarea',
                        required: true,
                        placeholder: 'must contain at least one $ followed by a number which specifies the placement of a character \n Example : $1 has killed $2',
                        value: ''
                    },
                    {
                        name: 'character',
                        input: 'input',
                        required: false,
                        placeholder: 'Mercy',
                        value: ''
                    }
                ]
            }
        }
    },
    mounted() {
        this.initEventInfo();
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