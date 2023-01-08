<template>
    <section class="around">
        <button class='btnclose' @click="$emit('close')">Hide</button>
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
                                        <img src="../assets/images/x.png" alt="X to remove a role from a user"
                                            class="deleteX" />
                                    </span>
                                </li>
                            </ul>
                            <select v-model="user.addRole">
                                <option disabled value="">Add a role : </option>
                                <option v-if="user.roles.manager === false">manager</option>
                                <option v-if="user.roles.supervisor === false">supervisor</option>
                                <option v-if="user.roles.admin === false">admin</option>
                            </select>
                            <span @click="addRole(user)"><img src="../assets/images/+.png"
                                    alt="plus sign to add a role to the user" class="addX" /></span>
                        </td>
                        <td class="danger" @click="deleteUser(user)"><img src="../assets/images/x.png"
                                alt="X to delete a user" class="deleteX" /></td>
                    </tr>
                </tbody>
            </table>
        </section>
        <button class="previous blueoutline" @click="$emit('userprevious')">Previous</button>
        <button class="next blueoutline" @click="$emit('usernext')">Next</button>
    </section>
</template>

<script>
/**
 * description : contains the user table
 */

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
        //the list of all users
        users: {
            required: true
        }
    },

    methods: {
        /**
         * Description: delete a user
         * Arguments:
         *      - user : the user to delete
         * */
        async deleteUser(user) {
            if (confirm('Are you sure you want to delete the user : ' + user.username)) {
                let result = await deleteUserById(user.user_id);
                if (result !== 0) {
                    await alert(user.username + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        },

        /**
         * Description: remove a role from a user
         * Arguments:
         *      - user : the user from which we need to remove a role
         *      - role : the name of the role to remove
         * */
        async removeRole(user, role) {
            let returned = false;
            //for each role of the user
            Object.keys(user.roles).forEach(async role => {
                if (returned === false) {
                    if (role === 'admin' && user.roles[role] === true) {
                        returned = true;
                        await alert('Sorry but you are not allowed to alter the roles of another admin user.');
                        return 0;
                    }
                    if (role === user.addRole && user.roles[role] === true) {
                        returned = true;
                        await alert('This user already has the role ' + user.addRole);
                        return 0;
                    }
                }
            })
            if (returned === true) {
                return 0;
            }
            let res = await deleteRoleFromUserByUserId(user, role);
            if (res !== 1) {
                this.$emit('load')
                alert('The role ' + this.$data.role + ' has been successfully removed from the user ' + user.username)
            }
        },

        /**
         * Description: add a role to a user
         * Arguments:
         *      - user : the user to which we need a role to be added
         * */
        async addRole(user) {
            let returned = false;
            //for each role of the user
            Object.keys(user.roles).forEach(async role => {
                if (returned === false) {
                    if (role === 'admin' && user.roles[role] === true) {
                        returned = true;
                        await alert('Sorry but you are not allowed to alter the roles of another admin user.');
                        return 0;
                    }
                    if (role === user.addRole && user.roles[role] === true) {
                        returned = true;
                        await alert('This user already has the role ' + user.addRole);
                        return 0;
                    }
                }
            })
            if (user.addRole !== 'admin' && user.addRole !== 'manager' && user.addRole !== 'supervisor') {
                returned = true;
                await alert('Please choose a role to be added.');
                return 0;
            }
            if (returned === true) {
                return 0;
            }

            /**
             * Description: add a role to a user
             * Arguments:
             *      - user : the user to add a role to
             *      - role : the name of the role to add
             * */
            let res = await addRoleToUserByUserId(user, user.addRole);
            if (res !== 1) {
                this.$emit('load');
                alert('The role ' + user.addRole + ' has successfully been added to the user ' + user.username)
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
    width: 100%;
}

.tab>button {
    margin-top: 15px;
}
</style>
