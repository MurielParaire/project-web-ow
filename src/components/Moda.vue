<template>

    <transition name="modal">
        <section class="modal-mask modal-wrapper">
            <section class="modal-container">
                <section class="x">
                    <img src="../assets/images/x.png" alt="X to close the window" class="right"
                        @click="$emit('close')" />
                </section>
                <section class="modal-header">
                    <slot name="header">
                        <h1>{{ this.information.title }}</h1>
                    </slot>
                </section>

                <section class="modal-body">
                    <slot name="body">
                        <form>
                            <section v-for="attribute in this.information.attributes" :key="attribute.name">
                                <section class="row">
                                    <section class="col-sm-3">
                                        <label for="username"> {{ attribute.name }} : </label>
                                    </section>
                                    <section class="col-sm-8">
                                        <input class='text' :placeholder="attribute.placeholder" type="text"
                                            :name="attribute.name" v-model="attribute.value"
                                            v-if="attribute.input === 'input'">
                                        <textarea v-else class="text" :placeholder="attribute.placeholder"
                                            :name="attribute.name" rows="5" cols="30" v-model="attribute.value">
                                        </textarea>
                                    </section>
                                </section>
                                <section v-if="attribute.required === true" class="row">
                                    <div class="input-errors" v-for="(error, index) of v$.form.req.$errors"
                                        :key="index">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </div>
                                </section>
                            </section>

                        </form>
                    </slot>
                </section>

                <section class="modal-footer">
                    <button class="submit center" @click="$emit('submit')">
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
    emits: ['submit'],
    setup() {
        return { v$: Vuelidate() }
    },
    data() {
        return {
            form: {
                attr: []
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
                req: {
                    required
                }
            }
        }
    }
}

</script>


<style scoped>
h1 {
    margin-top: 0;
}
.x {
    display: flex;
    justify-content: right;
}
img {
    max-width: 20px;
    max-height: 20px;
}

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