export { render };
import "@/utils";
import { createApp } from "@/main";
async function render(pageContext) {
  const { Page } = pageContext;
  const { app, appLoading, router } = createApp({ Page });

  appLoading.mount("#appLoading");
  router.isReady().then(() => {
    app.mount("#app");
  });
}
