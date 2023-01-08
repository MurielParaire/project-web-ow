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
                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.username.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>

            <section class="row">
                <section class="col-sm-3">
                    <label for="firstname"> First Name :</label>
                </section>
                <section class="col-sm-8">
                    <input class='text' placeholder="first name" type="text" v-model="v$.form.firstName.$model"
                        name="firstname">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.firstName.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>

            <section class="row">
                <section class="col-sm-3">
                    <label for="lastname">Last Name :</label>
                </section>
                <section class="col-sm-8">
                    <input class='text' placeholder="last name" type="text" v-model="v$.form.lastName.$model"
                        name="lastname">
                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.lastName.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>

            <section class="row email">
                <section class="col-sm-3">
                    <label for="email"> Email :</label>
                </section>
                <section class="col-sm-8">
                    <input class='text' placeholder="email" type="email" v-model="v$.form.email.$model" name="email">
                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>
            <!-- Password and Confirm Password Row -->
            <section class="row">
                <section class="col-sm-3">
                    <label for=""> Password :</label>
                </section>
                <section class="col-sm-8">
                    <input class='password' placeholder="password" type="password" v-model="v$.form.password.$model">
                    <div class="pre-icon os-icon os-icon-fingerprint"></div>
                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>
            <section class="row">
                <section class="col-sm-3">
                    <label for=""> Confirm password :</label>
                </section>
                <section class="col-sm-8">
                    <input class='password' placeholder="confirm password" type="password"
                        v-model="v$.form.confirmPassword.$model">
                    <div class="pre-icon os-icon os-icon-fingerprint"></div>
                    <!-- Error Message -->

                </section>
            </section>
            <section class="row">
                <div class="input-errors" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </section>
        </form>
        <a href="#" class='btn-login signin' @click="SignIn">Sign in</a>
        <button href="#" class='submit right' @click="this.createUser()">Submit</button>
    </section>

</template>

<script>
/**
 * Description: signup page
 * */


import Vuelidate from '@vuelidate/core'
import { required, helpers, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { validName, validUsername } from '../assets/verifications.js'
import { createUser } from '../database/User.js'

export default {
    setup() {
        return {
            v$: Vuelidate()
        }
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
    methods: {
        SignIn() {
            this.$router.push({
                name: "Login"
            })
        },
        async checkErrors() {
            this.v$.$touch()
            if (this.v$.$invalid) {
                alert('There are still some input errors left. Please correct them before submitting.');
                return 0;
            }
        },
        async createUser() {
            if (await this.checkErrors() === 0) {
                return 0;
            }
            let user = {
                username: this.form.username,
                firstname: this.form.firstName,
                lastname: this.form.lastName,
                email: this.form.email,
                password: this.form.password,
            }
            let res = await createUser(user);
            if (res !== 200) {
                if (res === 401) {
                    alert("Sorry but we couldn't create your accound. We only allow a maximum of 10 created accounts. Please refer to an administrator.")
                }
                alert('There was an error creating your account.')
            }
            else {
                this.$router.push({
                    name: "Login"
                })
            }

        }
    },
    validations() {
        return {
            form: {
                firstName: {
                    required, max: maxLength(20), name_validation: {
                        $validator: validName,
                        $message: 'Name can only contain letters, dashes (-) and spaces'
                    }
                },
                lastName: {
                    required, max: maxLength(20), name_validation: {
                        $validator: validName,
                        $message: 'Name can only contain letters, dashes (-) and spaces'
                    }
                },
                email: { required, email },
                password: { required, min: minLength(6), max: maxLength(20) },
                confirmPassword: {
                    required, sameAs: helpers.withMessage('Passwords need to be the same', sameAs(this.form.password))
                },
                username: {
                    required, min: minLength(3), max: maxLength(15), name_validation: {
                        $validator: validUsername,
                        $message: 'Username can only contain letter or dashes'
                    }
                }
            },
        }
    },
}

</script>

<style>

</style>