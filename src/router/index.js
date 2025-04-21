import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Pets       from '../views/Pets.vue';
import Medications from '../views/Medications.vue';

const routes = [
  { path: '/',            name: 'Dashboard',  component: Dashboard },
  { path: '/pets',        name: 'Pets',       component: Pets },
  { path: '/medications', name: 'Medications',component: Medications },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
