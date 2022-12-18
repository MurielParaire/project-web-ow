import * as VueRouter from 'vue-router'

import OverSim from '@/views/OverSim.vue'
import Characters from '@/views/characters.vue'
import Match from '@/views/Match.vue'
import Combat from '@/views/Combat.vue'
import UserLogin from '@/views/UserLogin.vue'
import CharacterDetail from '@/views/CharacterDetail.vue'
import UserHome from '@/views/UserHome.vue'
import UserSignup from '@/views/UserSignup.vue'

export const router = VueRouter.createRouter({
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
    },
    {
      path: '/home',
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/signup',
      name: 'UserSignup',
      component: UserSignup
    }
  ],
});