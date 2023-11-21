import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createManager } from '@vue-youtube/core';
import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(createManager());
app.mount('#app');
