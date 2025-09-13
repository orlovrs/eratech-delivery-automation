import { createRouter, createWebHashHistory } from 'vue-router'
import DeliveryTariffsList from '../components/MainPage.vue'

const routes = [
    { path: '/', component: DeliveryTariffsList },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})