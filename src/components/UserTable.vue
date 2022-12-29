<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table striped mb-0">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>email</th>
                    <th>roles</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in this.users" :key="user.user_id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.email }}</td>
                    <td class="warning">
                        <ul v-for="role in Object.keys(user.roles)" :key="role">
                            <li v-if="user.roles[role]">{{ role }}
                                <span v-if="role !== 'public' && role !== 'admin'" @click="removeRole(user, role)">
                                    <img src="../assets/images/x.png" alt="X to remove a role from a user" class="deleteX" />
                                </span>
                            </li>
                        </ul>
                        <select v-model="user.addRole">
                            <option disabled value="">Add a role : </option>
                            <option>public</option>
                            <option>manager</option>
                            <option>supervisor</option>
                            <option>admin</option>
                        </select>
                        <span @click="addRole(user)"><img src="../assets/images/+.png" alt="plus sign to add a role to the user" class="addX"/></span>
                    </td>
                    <td class="danger" @click="deleteUser(user)"><img src="../assets/images/x.png" alt="X to delete a user" class="deleteX"/></td>
                </tr>
            </tbody>
        </table>
        <button class="previous" @click="$emit('userprevious')">Previous</button>
        <button class="next" @click="$emit('usernext')">Next</button>
        <button class='close' @click="$emit('close')">Hide</button>
    </section>

</template>

<script>
import { deleteUserById, addRoleToUserByUserId, deleteRoleFromUserByUserId } from '../database/User.js'

export default {
    name: "Table",
    emits: ['load'],
    data() {
        return {
            role: ''
        }
    },
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
        },
        async removeRole(user, role) {
            for (let counter = 0; counter < user.roles.length; counter++) {
                if (user.role[counter] === 'admin') {
                    alert('Sorry but you are not allowed to alter the roles of another admin user.');
                    return 0;
                }
            }
            if (role === 'public') {
                alert('Every user is a public user. You are not allowed to remove that role from anyone.');
                return 0;
            }
            let res = await deleteRoleFromUserByUserId(user, role);
            if (res !== 1) {
                this.$emit('load')
                alert('The role ' + this.$data.role + ' has been successfully removed from the user ' + user.username)
            }
        },
        async addRole(user) {
            for (let counter = 0; counter < user.roles.length; counter++) {
                if (user.role[counter] === 'admin') {
                    alert('Sorry but you are not allowed to alter the roles of another admin user.');
                    return 0;
                }
            }
            let res = await addRoleToUserByUserId(user, user.addRole);
            if (res !== 1) {
                this.$emit('load');
                alert('The role ' + this.$data.role + ' has successfully been added to the user ' + user.username)
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