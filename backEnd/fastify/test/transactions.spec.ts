import {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
  beforeEach,
} from "vitest";
import request from "supertest";
import { app } from "../src/app";
import { execSync } from "node:child_process";

describe("Rotas de transações", () => {
  beforeAll(async () => await app.ready());

  beforeEach(() => {
    execSync("yarn knex migrate:rollback --all");
    execSync("yarn knex migrate:latest");
  });

  test("criar transação", async () => {
    await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" })
      .expect(201);
  });

  test("listar trasações", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({ title: "New transaction", amount: 5000 }),
    ]);
  });

  test("mostrar trasação", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "New transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({ title: "New transaction", amount: 5000 })
    );
  });

  test("mostrar resumo", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({ title: "Credit transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({ title: "Debit transaction", amount: 2000, type: "debit" });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    });
  });

  afterAll(async () => await app.close());
});