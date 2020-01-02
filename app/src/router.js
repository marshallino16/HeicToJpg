import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
const Home = () => import('./views/Home.vue')

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})

router.beforeEach((to, from, next) => {

    //console.log('TO', to)
    //console.log('STORE', store)

    /*if (to.path.includes('/quiz') && store.state.quizService.currentQuiz.length === 0) next('/')
    else */ next()
})


export default router