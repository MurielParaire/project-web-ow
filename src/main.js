import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-select/dist/vue-select.css";
import {router} from '@/router/router.js'
import { createPinia } from 'pinia'
import Vuelidate from '@vuelidate/core';



const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Vuelidate)

app.mount('#app');