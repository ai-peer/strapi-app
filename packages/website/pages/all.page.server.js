import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { createApp } from "@/main";
export { render };

console.info("env", import.meta.env.MODE);

async function render(pageContext) {
  const { Page } = pageContext;
  const { app, appLoading, router } = createApp({ Page });
  // set the router to the desired URL before rendering
  router.push(pageContext.urlPathname);
  await router.isReady();
  const appHtml = await renderToString(app);
  //const appLoadingHtml = await renderToString(appLoading, {});
  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">
          ${dangerouslySkipEscape(appHtml)}
        </div>
      </body>
    </html>`;
}
