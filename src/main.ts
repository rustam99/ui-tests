import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import '@/assets/css/style.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
