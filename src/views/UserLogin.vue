<template>

    <section class='login'>
        <section class='head'>
            <h1>OverSim2</h1>
        </section>
        <section class='form'>
            <form>
                <input type="text" placeholder='username' class='text' required v-model="username"><br>
                <input type="password" placeholder='password' class='password' required v-model="password"><br>
                <a href="#" @click="SignUp" class='btn-login signup'>Sign up</a>
                <a href="#" class='forgot' @click="forgot">Forgot?</a>
            </form>
            <button href="#" class='submit' @click="this.verifyUser()">Submit</button>
        </section>
    </section>

</template>

<script>
import { authstore } from '../stores/auth.js';
import { verifyUser } from '../database/User.js';

export default {
    name: 'UserLogin',
    methods: {
        async verifyUser() {
            let user = {'username': this.username, 'password': this.password};
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