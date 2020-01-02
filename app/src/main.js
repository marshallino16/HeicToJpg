import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index'
import VueLazyload from "vue-lazyload"
import './registerServiceWorker'

import '@/style/style.scss'

import * as SocialSharing from "vue-social-sharing";
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(SocialSharing);
Vue.use(VueLazyload);
Vue.config.productionTip = false;

VueCookies.config('6h')

const PRESS_TIMEOUT = 1000

Vue.directive('longpress', {
    bind: function (el, {value}, vNode) {
        if (typeof value !== 'function') {
            console.warn(`Expect a function, got ${value}`)
            return
        }

        let pressTimer = null

        const start = e => {
            if (e.type === 'click' && e.button !== 0) {
                return;
            }

            if (pressTimer === null) {
                pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
            }
        }

        const cancel = () => {
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
            }

        ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
        ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
