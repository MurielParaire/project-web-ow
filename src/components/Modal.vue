<template>

    <transition name="modal">
            <section class="modal-mask modal-wrapper">
                <section class="modal-container">

                    <section class="modal-header">
                        <slot name="header">
                            <h1>Create a new Hero</h1>
                        </slot>
                    </section>

                    <section class="modal-body">
                        <slot name="body">
                            <form>
                                <section class="row">
                                    <section class="col-sm-3">
                                        <label for="username"> Name : </label>
                                    </section>
                                    <section class="col-sm-8">
                                        <input class='text' placeholder="Name" type="text" name="name"
                                            v-model="v$.form.name.$model">
                                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                                    </section>
                                </section>
                                <section class="row">
                                    <div class="input-errors" v-for="(error, index) of v$.form.name.$errors"
                                        :key="index">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </section>
                                <section class="row">
                                    <section class="col-sm-3">
                                        <label for="role"> Role : </label>
                                    </section>
                                    <section class="col-sm-8">
                                        <input class='text' placeholder="Role" type="text" name="role"
                                            v-model="v$.form.role.$model">
                                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                                    </section>
                                </section>
                                <section class="row">
                                    <div class="input-errors" v-for="(error, index) of v$.form.role.$errors"
                                        :key="index">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </section>
                                <section class="row">
                                    <section class="col-sm-3">
                                        <label for="description"> Description : </label>
                                    </section>

                                    <section class="col-sm-8">
                                        <textarea class="text" placeholder="Description" name="description" rows="5" cols="33" v-model="v$.form.description.$model">
                                        </textarea>
                                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                                    </section>
                                </section>
                                <section class="row">
                                    <div class="input-errors" v-for="(error, index) of v$.form.description.$errors"
                                        :key="index">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </section>
                                <section class="row">
                                    <section class="col-sm-3">
                                        <label for="image"> Image : </label>
                                    </section>
                                    <section class="col-sm-8">
                                        <input class='text' placeholder="Image" type="text" name="image"
                                            v-model="v$.form.image.$model">
                                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                                    </section>
                                </section>
                                <section class="row">
                                    <div class="input-errors" v-for="(error, index) of v$.form.image.$errors"
                                        :key="index">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </section>
                            </form>
                        </slot>
                    </section>

                    <section class="modal-footer">
                            <button class="submit center" @click="$emit('close')">
                                Submit
                            </button>
                    </section>
                </section>
            </section>

    </transition>

</template>

<script>
import Vuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: Vuelidate() }
    },
    data() {
        return {
            form: {
                name: '',
                role: '',
                description: '',
                image: ''
            }
        }
    },
    methods: {
    },
    props: {
        information: {
            required: true
        }
    },
    validations() {
        return {
            form: {
                name: {
                    required
                },
                role: {
                    required
                },
                description: { required },
                image: { required }
            },
        }
    },
}

</script>


<style>
.modal-footer {
    text-align: center;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 50%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}


.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}


.text {
    width: 100%;
}

</style>