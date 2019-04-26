import Vue from 'nativescript-vue';
import App from './components/App.vue';

import RadListView from 'nativescript-ui-listview/vue'
const platformModule = require("tns-core-modules/platform");

Vue.use(RadListView)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

import "./_commom.scss";

if (platformModule.isAndroid) {
  // android specific styles
  require("./app.android.scss");
} else if (platformModule.isIOS) {
  // ios specific styles
  require("./app.ios.scss");
}

Vue.prototype.$url_api = 'http://notedell/pAPI_WSD_Agenda'

new Vue({

  render: h => h('frame', [h(App)])
}).$start();
