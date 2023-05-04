export { render };
import "@/utils";
import { createApp } from "@/main";
console.info("=============>client");
async function render(pageContext) {
  const { Page } = pageContext;
  const { app, appLoading, router } = createApp({ Page });

  appLoading.mount("#appLoading");
  router.isReady().then(() => {
    app.mount("#app");
  });
}
