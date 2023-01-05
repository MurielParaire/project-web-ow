import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-select/dist/vue-select.css";
import {router} from '@/router/router.js'
import Vuelidate from '@vuelidate/core';



const app = createApp(App);
app.use(router);
app.use(Vuelidate)

app.mount('#app');