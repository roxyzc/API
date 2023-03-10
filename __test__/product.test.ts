import request from "supertest";
import server from "../src/server";

describe("test route", () => {
  test("test product", async () => {
    const id = "asdajsvdjav";
    const res = await request(server).get(`/api/product/${id}`);
    expect(res.statusCode).toBe(404);
  });
});
