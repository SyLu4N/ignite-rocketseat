import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extratcQueryParams } from "./utils/extract-query-params.js";

// Query Parameters (?userId=1): URL Stateful => filtros, paginação, não obrigatórios
// Route Parameters (/1): Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extratcQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
