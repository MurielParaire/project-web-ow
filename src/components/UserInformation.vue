<template>
    <h2> {{ this.user.username }}</h2>
    <p>Last name : {{ this.user.lastname }}</p>
    <p>First name : {{ this.user.firstname }}</p>
    <p>Email : {{ this.user.email }}</p>
    <button class="submit" @click="modifyUser">Modify Information</button>
    <ModalVue v-if="showModifyUser" @close="showModifyUser = false" @submit="modifyUserInfo"
        :information="modifyUserInformation">
    </ModalVue>
</template>

<script>
/**
 * description : show the user information
 */

import ModalVue from '../components/Moda.vue';
import { modifyUser } from '../database/User.js';
import { validName, validUsername, validEmail } from '../assets/verifications.js';

export default {
    components: {
        ModalVue
    },
    emits: ['submit'],
    name: 'UserInformation',
    data() {
        return {
            showModifyUser: false,
            //information for the ModalVue
            modifyUserInformation: {
                title: 'Modify your information',
                attributes: [
                    {
                        name: 'username',
                        input: 'input',
                        required: false,
                        placeholder: this.user.username,
                        value: this.user.username,
                        max: 50,
                    },
                    {
                        name: 'firstname',
                        input: 'input',
                        required: false,
                        placeholder: this.user.firstname,
                        value: this.user.firstname,
                        max: 20
                    },
                    {
                        name: 'lastname',
                        input: 'input',
                        required: false,
                        placeholder: this.user.lastname,
                        value: this.user.lastname,
                        max: 20
                    },
                    {
                        name: 'email',
                        input: 'email',
                        required: false,
                        placeholder: this.user.email,
                        value: this.user.email,
                        max: 100
                    }
                ]
            },
        }
    },
    methods: {
        /**
         * Description: modifies the user template information to match the current users' information
         * */
        modifyUser() {
            this.$data.modifyUserInformation.attributes[0].placeholder = this.user.username,
                this.$data.modifyUserInformation.attributes[0].value = this.user.username,
                this.$data.modifyUserInformation.attributes[1].placeholder = this.user.firstname,
                this.$data.modifyUserInformation.attributes[1].value = this.user.firstname,
                this.$data.modifyUserInformation.attributes[2].placeholder = this.user.lastname,
                this.$data.modifyUserInformation.attributes[2].value = this.user.lastname,
                this.$data.modifyUserInformation.attributes[3].placeholder = this.user.email,
                this.$data.modifyUserInformation.attributes[3].value = this.user.email,
                this.$data.showModifyUser = true
        },

        /**
         * Description: sets the users' information
         * */
        async getUser() {
            if (validUsername(this.$data.modifyUserInformation.attributes[0].value) === false) {
                await alert('username can only contain letters and dashes');
                return 0;
            }
            if (validName(this.$data.modifyUserInformation.attributes[1].value) === false || validName(this.$data.modifyUserInformation.attributes[2].value) === false) {
                await alert('names are only allowed to contain letters, dashes and spaces');
                return 0;
            }
            if (validEmail(this.$data.modifyUserInformation.attributes[3].value) === false) {
                await alert('wrong email format');
                return 0;
            }

            let user = { user_id: this.user.user_id };
            if (this.$data.modifyUserInformation.attributes[0].placeholder !== this.$data.modifyUserInformation.attributes[0].value && this.$data.modifyUserInformation.attributes[0].value !== '') {
                user.username = this.$data.modifyUserInformation.attributes[0].value;
            }
            else {
                user.username = this.user.username;
            }
            if (this.$data.modifyUserInformation.attributes[1].placeholder !== this.$data.modifyUserInformation.attributes[1].value && this.$data.modifyUserInformation.attributes[1].value !== '') {
                user.firstname = this.$data.modifyUserInformation.attributes[1].value;
            }
            else {
                user.firstname = this.user.firstname;
            }
            if (this.$data.modifyUserInformation.attributes[2].placeholder !== this.$data.modifyUserInformation.attributes[2].value && this.$data.modifyUserInformation.attributes[2].value !== '') {
                user.lastname = this.$data.modifyUserInformation.attributes[2].value;
            }
            else {
                user.lastname = this.user.lastname;
            }
            if (this.$data.modifyUserInformation.attributes[3].placeholder !== this.$data.modifyUserInformation.attributes[3].value && this.$data.modifyUserInformation.attributes[3].value !== '') {
                user.email = this.$data.modifyUserInformation.attributes[3].value;
            }
            else {
                user.email = this.user.email;
            }
            return user;
        },

        /**
         * Description: modifies the users information
         * */
        async modifyUserInfo() {
            let user = await this.getUser()
            if (user === 0) {
               return 0;
            }
            let res = await modifyUser(user, this.user.user_id);
            if (res !== 0) {
                this.showModifyUser = false;
                this.$emit('load')
            }
        }
    },
    props: {
        //the currently connected user
        user: {
            required: true
        }
    }
}

</script>

<style scoped>
h2 {
    font-size: x-large;
    font-weight: bold;
}
</style>
