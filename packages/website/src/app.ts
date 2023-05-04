import { createApp } from "./main";

let { app, router } = createApp();
router.isReady().then(() => {
  app.mount("#app");
});
