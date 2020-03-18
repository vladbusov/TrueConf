import Vue from 'vue';
import App from './template';
import router from './router';
export const eventEmitter = new Vue();
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});