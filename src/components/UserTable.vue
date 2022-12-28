<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table striped mb-0">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>email</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in this.users" :key="user.user_id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.email }}</td>
                    <td class="danger" @click="deleteUser(user)">-</td>
                </tr>
            </tbody>
        </table>
        <button class="previous" @click="$emit('userprevious')">Previous</button>
        <button class="next" @click="$emit('usernext')">Next</button>
        <button class='close' @click="$emit('close')">Hide</button>
    </section>

</template>

<script>
import {deleteUserById} from '../database/User.js'

export default {
    name: "Table",
    props: {
        users: {
            required: true
        }
    },
    methods: {
        async deleteUser(user) {
            if (confirm('Are you sure you want to delete the user : ' + user.username)) {
                let result = await deleteUserById(user.user_id);
                if (result !== 0) {
                    alert(user.username + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        }
    }
}
</script>

<style scoped>
.tab {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

.tab>button {
    margin-top: 15px;
}
</style>