import * as VueRouter from 'vue-router'

const OverSim = () => import('@/views/OverSim.vue')
const Characters = () => import('@/views/Characters.vue')
const Match = () => import('@/views/Match.vue')
const Combat = () => import('@/views/Combat.vue')
const UserLogin = () => import('@/views/UserLogin.vue')
const CharacterDetail = () => import('@/views/CharacterDetail.vue')
const UserHome = () => import('@/views/UserHome.vue')
const UserSignup = () => import('@/views/UserSignup.vue')

import {authstore} from '../stores/auth.js'
import { matchstore } from '../stores/trans.js'

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
      beforeEnter: (to, from, next) => {
        console.log(matchstore.getters.getTeamA.length)
        if(matchstore.getters.getTeamA.length < 5) {
          next({name: 'Match'});
        } else {
            next();
        }
    }
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
      component: UserHome,
      beforeEnter: (to, from, next) => {
        if(authstore.getters.isConnected === true) {
            next();
        } else {
            next({name: 'Login'});
        }
    }

    },
    {
      path: '/signup',
      name: 'UserSignup',
      component: UserSignup
    }
  ],
});