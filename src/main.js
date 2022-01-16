import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { projectAuth } from './firebase/config';

import './assets/tailwind.css';
// global styles
import './assets/css/main.css';

// wait for firebase to confirm we user is logged in or not
// call back function will fire ever time firebase detect a change in authentication
//  however it will fire initially when it first detects if user is logged in or out
// and first at this point we want to mount the application
// but we just want to do it once:

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app');
  }
});

// createApp(App).use(store).use(router).mount('#app');
