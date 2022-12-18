<template>
    <section class='login'>
        <section class='head'>
            <h1>OverSim2</h1>
        </section>
        <form @submit.prevent="onSubmit" class="form">
            <section class="row">
                <section class="col-sm-3">
                    <label for="username"> Username : </label>
                </section>
                <section class="col-sm-8">
                    <input class='text' placeholder="username" type="text" name="username"
                        v-model="v$.form.username.$model">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.firstName.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </section>
            </section>
            <!-- First and Last Name Row -->
            <section class="row">
                <section class="col-sm-6">
                    <label for="firstname"> First Name :</label>
                    <input class='text' placeholder="first name" type="text"
                        v-model="v$.form.firstName.$model" name="firstname">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.firstName.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </section>

                <section class="col-sm-6">
                    <label for="lastname">Last Name :</label>
                        <input class='text' placeholder="last name" type="text"
                        v-model="v$.form.lastName.$model" name="lastname">
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.lastName.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </section>
            </section>

            <section class="row">
                <!-- Email Row -->
                <label for="email"> Email address :</label><input class='text' placeholder="email" type="email"
                    v-model="v$.form.email.$model" name="email">
                <!-- Error Message -->
                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>

            <!-- Password and Confirm Password Row -->
            <section class="row">
                <section class="col-sm-6">
                    <label for=""> Password :</label><input class='password' placeholder="password" type="password"
                        v-model="v$.form.password.$model">
                    <div class="pre-icon os-icon os-icon-fingerprint"></div>
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </section>

                <section class="col-sm-6">
                    <label for="">Confirm Password :</label><input @input="checkPassword()" class='password'
                        placeholder="confirm password" type="password" v-model="v$.form.confirmPassword.$model">
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </section>
            </section>
        </form>
        <a href="#" class='btn-login left'>Sign in</a>
        <button href="#" class='submit rigth' @click="this.verifyUser()">Submit</button>
    </section>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'


export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}


export default {

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            form: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    },

    validations() {
        return {
            form: {
                firstName: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
                    }
                },
                lastName: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
                    }
                },
                email: { required, email },
                password: { required, min: minLength(6) },
                confirmPassword: { required },
                username: { required, min: minLength(3) }
            },
        }
    },
}

</script>

<style scoop>
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
    margin-bottom: 20px;
    margin-top: 20px;
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
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
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
</style>