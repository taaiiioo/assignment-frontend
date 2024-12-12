import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';  // Import the store

createApp(App)
  .use(router)
  .use(store)  // Use the store
  .mount('#app');