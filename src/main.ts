import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import '@/quasar';
import i18n from '@/i18n';

// Import the Auth0 configuration
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { domain, clientId } = require('../auth_config.js');

// Import the plugin here
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Auth0Plugin } = require('./auth0.js');

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState: any) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

const app = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
