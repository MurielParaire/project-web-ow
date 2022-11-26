import OverSim from '@/views/OverSim'
import characters from '@/views/characters'
import * as VueRouter from 'vue-router'

const Foo = { template: '<div>foo</div>' }

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
      name: 'characters',
      component: characters
    },
    { path: '/foo', component: Foo }/*,
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      props: true,
      component: () => import('../views/Pokemon.vue')
    }*/
  ],
});
  
  
  export default router