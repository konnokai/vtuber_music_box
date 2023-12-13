import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createManager } from '@vue-youtube/core';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Tailwind from 'primevue/passthrough/tailwind';

const app = createApp(App);

app.use(createPinia());
app.use(createManager());
app.use(PrimeVue, { unstyled: true, pt: Tailwind });
app.mount('#app');
