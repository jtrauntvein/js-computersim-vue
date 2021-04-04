import Vue from 'vue'
import App from './App.vue'
import Computer from "./components/Computer.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.mixin(Computer);

new Vue({
  render: h => h(App),
}).$mount('#app')
