import Vue from 'vue';
import Router from 'vue-router';
import TrafficLight from '@/objects/TrafficLight';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/:color',
            name: 'TrafficLight',
            component: TrafficLight,
        },
        {
            path: '*',
            redirect: '/red',
        },
    ],
    mode: 'history',
});