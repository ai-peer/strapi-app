import { createApp } from "vue";
import VueRouter from "vue-router";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import apolloClient from "./vue-apollo";

//Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const app = createApp(App, {
  apolloProvider,
  router,
});
app.use(VueApollo);
app.use(VueRouter);
app.use(router);

app.mount("#app");

/* 
new Vue({
    apolloProvider,
    router,
   
  }).$mount("#app");
 */
