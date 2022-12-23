<template>

    <section class='login'>
        <section class='head'>
            <h1>OverSim2</h1>
        </section>
        <section class='form'>
            <form>
                <input type="text" placeholder='username' class='text' required v-model="username"><br>
                <input type="password" placeholder='password' class='password' required v-model="password"><br>
                <a href="#" class='btn-login'>Sign in</a>
                <a href="#" @click="SignUp" class='btn-login'>Sign up</a>
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
.login {
    margin-top: 10%;
    background-color: rgb(249, 158, 26, .5);
    margin: auto;
    box-shadow:
        0px 2px 10px rgba(0, 0, 0, 0.2),
        0px 10px 20px rgba(0, 0, 0, 0.3),
        0px 30px 60px 1px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 50px;
    width: 30%;
}

.form>section>section {
    display: flex;
    justify-content: left;
}

.login .head {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login p {
    text-align: center;
}

.login .form input[type=text].text {
    border: none;
    background: none;
    box-shadow: 0px 2px 0px 0px black;
    width: 100%;
    font-size: 1em;
    outline: none;
}

.email input[type=email].text {
    border: none;
    background: none;
    box-shadow: 0px 2px 0px 0px black;
    width: 100%;
    font-size: 1em;
    outline: none;
}

.login .form .text::placeholder {
    color: black;
}

.login .form input[type=password].password {
    border: none;
    background: none;
    box-shadow: 0px 2px 0px 0px black;
    width: 100%;
    color: black;
    font-size: 1em;
    outline: none;
}

.login .form .password::placeholder {
    color: black;
}

.login .form .btn-login {
    background: none;
    text-decoration: underline;
    color: black;
    border-radius: 3px;
    padding: 5px 2em;
    transition: 0.5s;
}

.login .form .btn-login:hover {
    color: #218ffe;
    transform: 0.5s;
    transition: 0.5s;
}

.login .forgot:hover {
    color: #218ffe;
    transform: 0.5s;
    transition: 0.5s;
}

.login .forgot {
    text-decoration: none;
    color: black;
    float: right;
}

.submit {
    text-decoration: none;
    font-size: large;
    background-color: transparent;
    cursor: pointer;
    border: none;
}

.submit:hover {
    color: #218ffe;
    scale: 1.2;
    transform: 0.7s;
    transition: 0.7s;
}

.row {
    padding-top: 15px;
}

.signin {
    display: flex;
    justify-content: right;
    text-align: right;
}

label {
    text-align: left;
}

</style>