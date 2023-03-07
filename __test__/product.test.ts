import supertest from "supertest";
import createServer from "../src/utils/server.util";

describe("test", () => {
  describe("test product", () => {
    it("coba", async () => {
      const id = "122";
      const request = await supertest(createServer).get(`http://localhost/api/product/${id}`);
      expect(request.statusCode).toBe(404);
    });
  });
});
