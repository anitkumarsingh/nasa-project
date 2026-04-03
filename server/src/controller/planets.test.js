const request = require("supertest");
const app = require("../app");

describe("Planets API", () => {
  // ─── GET /planets ─────────────────────────────────────────────────────────
  describe("GET /planets", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get("/planets");
      expect(response.statusCode).toBe(200);
    });

    test("should respond with JSON content type", async () => {
      const response = await request(app).get("/planets");
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("should respond with an array", async () => {
      const response = await request(app).get("/planets");
      expect(Array.isArray(response.body)).toBe(true);
    });

    test("should not return an error object", async () => {
      const response = await request(app).get("/planets");
      expect(response.body).not.toHaveProperty("error");
    });
  });
});
