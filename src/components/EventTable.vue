<template>
<section class="around">
    <button class="btnclose" @click="$emit('close')">Hide</button>
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
                    <td class="warning" @click="openmodifyEvent(e)"><img src="../assets/images/modify.png"
                            alt="png of a pen to modify the event" class="addX" /></td>
                    <td class="danger" @click="deleteEvent(e)"> <img src="../assets/images/x.png"
                            alt="X to close the window" class="deleteX" /></td>
                </tr>
            </tbody>
        </table>
    </section>
    <button class="previous blueoutline" @click="$emit('eventprevious')">Previous</button>
    <button class="next blueoutline" @click="$emit('eventnext')">Next</button>
    <ModaVue v-if="showmodifyEvent" @submit="modifyEventJS" :information="modifyEventInfo"
        @close="this.$data.showmodifyEvent = false"></ModaVue>
    </section>
</template>

<script>
/**
 * description : contains the user table
 */


import { deleteEventById, modifyEvent, getEventTypes } from '../database/Event.js'
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
        /**
         * Description: delete an event
         * Arguments:
         *      - event : the event to delete
         * */
        async deleteEvent(event) {
            if (confirm('Are you sure you want to delete the event : ' + event.description)) {
                let result = await deleteEventById(event.event_id);
                if (result !== 0) {
                    alert(event.description + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        },

        /**
         * Description: open the vue to modify an existing event
         * Arguments:
         *      - event : the event to modify
         * */
        openmodifyEvent(event) {
            this.$data.selectedEvent = event;
            this.updateEventInfo(event);
            this.$data.showmodifyEvent = true;
        },

        /**
         * Description: saves the modified event
         * */
        async modifyEventJS() {
            let event = this.getEvent();
            let res = await modifyEvent(event);
            if (res !== 0) {
                this.$data.showmodifyEvent = false;
            }
        },

        /**
         * Description: gets the updated event info by comparing it to its old info
         * Returns: the updated event
         * */
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

        /**
         * Description: updates the information which will be given to the vue which lets the user modify an event
         * Arguments:
         *      - event : the event the user wants to modify
         * Returns: a string with all the names of the heroes
         * */
        updateEventInfo(event) {
            this.$data.modifyEventInfo.attributes[0].value = event.type;
            this.$data.modifyEventInfo.attributes[0].placeholder = event.type;
            this.$data.modifyEventInfo.attributes[1].value = event.description;
            this.$data.modifyEventInfo.attributes[1].placeholder = event.description;
            this.$data.modifyEventInfo.attributes[2].value = event.name;
            this.$data.modifyEventInfo.attributes[2].placeholder = event.name;
        },

        /**
         * Description: initializes the event information
         * */
        async initEventInfo() {
            let types = await getEventTypes();
            this.$data.modifyEventInfo = {
                title: 'Modify an Event',
                attributes: [
                    {
                        name: 'type',
                        input: 'dropdown',
                        options: types,
                        required: true,
                        placeholder: 'kill',
                        value: '',
                        max: 10
                    },
                    {
                        name: 'description',
                        input: 'textarea',
                        required: true,
                        placeholder: 'must contain at least one $ followed by a number which specifies the placement of a character \n Example : $1 has killed $2',
                        value: '',
                        max: 200
                    },
                    {
                        name: 'character',
                        input: 'input',
                        required: false,
                        placeholder: 'Mercy',
                        value: '',
                        max: 20
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
