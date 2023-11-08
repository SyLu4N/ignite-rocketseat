import { knex as setupKnex, Knex } from "knex";
import { env } from "./env";

export const configKnex: Knex.Config = {
  client: "sqlite",

  connection: {
    filename: env.DATABASE_URL,
  },

  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },

  useNullAsDefault: true,
};

export const knex = setupKnex(configKnex);
