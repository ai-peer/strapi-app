import { createApp } from "vue";
import App from "./App.vue";
import AppLoading from "./components/common/app-loading.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupI18n } from "./locales";

export function setupApp() {
  // import assets: js、css
  setupAssets();

  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount("#appLoading");

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  const router = setupRouter(app);

  setupI18n(app);
  /* 
  // mount app
  router.isReady().then(() => {
    app.mount("#app");
  }); */
  return {
    app,
    router,
  };
}

//setupApp();
