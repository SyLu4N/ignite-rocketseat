import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto";
import { env } from "./env";

const app = fastify();

app.get("/hello", async () => {
  const transction = await knex("transactions").select("*");

  return transction;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server running!");
    console.log("http://localhost:3333");
  });
