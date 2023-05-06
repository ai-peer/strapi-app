// server.js
// Environment: Node.js server

// 在此例子中我们使用 Express.js，
// 但我们也可使用任意其他服务端框架
const express = require("express");
const path = require("path");
const { renderPage } = require("vite-plugin-ssr/server");

const isProduction  = process.env.NODE_ENV === "production";
const root = path.resolve();

startServer();

async function startServer() {
  const app = express();
  if (isProduction) {
    app.use(express.static(`${root}/client`));
  } else {
    const vite = require("vite");
    let viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.httpResponse === null) return next();
    const { body, statusCode, contentType } = pageContext.httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  const port = 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
