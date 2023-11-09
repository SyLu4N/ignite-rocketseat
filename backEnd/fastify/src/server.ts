import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server running!");
    console.log("http://localhost:3333");
  });
