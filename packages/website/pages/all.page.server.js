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
  const appLoadingHtml = await renderToString(appLoading); //${dangerouslySkipEscape(appHtml)}
  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">
          <div style="position: fixed;width: 100%;height: 100%; left: 0;top: 0;">
            <div style="display: flex;flex-wrap: wrap; justify-content: center;align-items: center; width:100%; height: 100%; text-align: center;">
                <img src="/loading.gif" />
            </div>
          </div>
          ${dangerouslySkipEscape(appHtml)}
        </div>
      </body>
    </html>`;
}
