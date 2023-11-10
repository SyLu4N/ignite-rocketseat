import { knex as setupKnex, Knex } from "knex";
import { env } from "./env";

const { DATABASE_CLIENT, DATABASE_URL } = env;

export const configKnex: Knex.Config = {
  client: DATABASE_CLIENT,

  useNullAsDefault: true,

  connection:
    DATABASE_CLIENT === "sqlite" ? { filename: DATABASE_URL } : DATABASE_URL,

  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(configKnex);
