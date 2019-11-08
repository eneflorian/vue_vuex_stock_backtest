// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import vuexI18n from 'vuex-i18n';
import store from './store';
import transEn from './i18n/en.json';
// import Api from './lib/Api';

window.progress = 0;  //pace
// check interval
const intervalTime = 5;

// Debug
window.debugStellarBot = !(process.env.NODE_ENV === 'production');
window.Sconsole = (resultArrOrStr, msgType = 'debug') => {
  if (msgType === 'msg'
    || (msgType === 'debug' && window.debugStellarBot === true)) {
    console.log(resultArrOrStr);
  }
};

// init VueMaterial
Vue.use(VueMaterial);
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'orange',
  warn: 'red',
});

// to config I18n
Vue.use(vuexI18n.plugin, store);

// default lang - en
Vue.i18n.add('en', transEn);

// set the start locale
if (store.getters.lang) {
  Vue.i18n.set(store.getters.lang);
} else {
  Vue.i18n.set('en');
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    version: "1.0.0",
    serverUrl: 'https://horizon.stellar.org',
    server: null,
    robotInterval: null,
  },
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
    intervalFunc() {
    },
    robot() {
    }
  },
  mounted() {
  }
});
