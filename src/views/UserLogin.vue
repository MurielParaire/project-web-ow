<template>

    <section class='login'>
        <section class='head'>
            <h1>OverSim2</h1>
        </section>
        <section class='form'>
            <form>
                <input @keyup.enter="verifyUser" type="text" placeholder='username' class='text' required v-model="username"><br>
                <input @keyup.enter="verifyUser" type="password" placeholder='password' class='password' required v-model="password"><br>
                <a href="#" @click="SignUp" class='btn-login signup'>Sign up</a>
                <a href="#" class='forgot' @click="forgot">Forgot?</a>
            </form>
            <button href="#" class='submit' @click="this.verifyUser()">Submit</button>
        </section>
    </section>

</template>

<script>
import Vuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { validUsername } from '../assets/verifications.js'
import { authstore } from '../stores/auth.js';
import { verifyUser } from '../database/User.js';

export default {
    name: 'UserLogin',
    data() {
        return {
            password: '',
            username: ''
        }
    },
    methods: {
        async verifyUser() {
            if (await this.checkErrors() === 0) {
                return 0;
            }
            let user = { 'username': this.username, 'password': this.password };
            let data = await verifyUser(user);
            if (data === 0) {
                alert('wrong password or username');
            }

            else {
                sessionStorage.setItem('token', JSON.stringify(data))
                authstore.commit('setConnected')
                this.toHomePage();
            }
        },
        toHomePage() {
            this.$router.push({
                name: "UserHome"
            });
        },
        SignUp() {
            this.$router.push({
                name: "UserSignup"
            })
        },
        forgot() {
            this.$router.push({
                name: "Forgot"
            })
        },
        async checkErrors() {
            this.v$.$touch()
            if (this.v$.$invalid) {
                alert('There are still some input errors left. Please correct them before submitting.');
                return 0;
            }
        },
    },
    setup() {
        return { v$: Vuelidate() }
    },
    validations() {
        return {
            password: { required, min: minLength(6), max: maxLength(20) },
            username: {
                required, min: minLength(3), max: maxLength(15), name_validation: {
                    $validator: validUsername,
                    $message: 'Username can only contain letter or dashes'
                }
            }
        }
    }
}



</script>

<style scoped>
.row {
    padding-top: 15px;
}

label {
    text-align: left;
}

.signup {
    display: flex;
    justify-content: left;
    text-align: left;
}
</style>