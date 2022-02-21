const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === "/") {
      app.render(req, res, "/", query);
    } else if (pathname === "/main") {
      app.render(req, res, "/main", query);
    } else if (pathname === "/reset") {
      app.render(req, res, "/reset", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
