import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap-vue/dist/bootstrap-vue.css"
import * as VueRouter from 'vue-router'

import OverSim from '@/views/OverSim.vue'
import Characters from '@/views/characters.vue'
import Match from '@/views/Match.vue'
import Combat from '@/views/Combat.vue'
import UserLogin from '@/views/UserLogin.vue'
import CharacterDetail from '@/views/CharacterDetail.vue'
import "vue-select/dist/vue-select.css";



const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
    {
      path: '/',
      name: 'overSim_home',
      component: OverSim
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters
    },
    {
      path: '/match',
      name: 'Match',
      component: Match
    },
    {
      path: '/combat/',
      name: 'Combat',
      component: Combat,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLogin
    },
    {
      path: '/characters/:name',
      name: 'CharacterDetail',
      component: CharacterDetail,
      props: true
    }
    /*,
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      props: true,
      component: () => import('../views/Pokemon.vue')
    }*/
  ],
});
  
  

const app = createApp(App);
app.use(router);
app.mount('#app');