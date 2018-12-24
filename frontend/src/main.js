import Vue from 'vue'
import App from './App.vue'
import { store } from 'Src/store/store';
import router from 'Src/router';

import styles from "../assets/styles.scss";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App) 
}).$mount('#app')