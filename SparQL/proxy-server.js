const cors_proxy = require("cors-anywhere");

const host = "localhost";
const port = 8080;

cors_proxy.createServer({
  originWhitelist: [], // Permitir todas las solicitudes
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
}).listen(port, host, () => {
  console.log(`CORS Anywhere está funcionando en http://${host}:${port}`);
});
