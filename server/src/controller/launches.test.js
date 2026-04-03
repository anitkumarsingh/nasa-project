const request = require("supertest");
const app = require("../app");

describe("Launches API", () => {
  // ─── GET /launches ────────────────────────────────────────────────────────
  describe("GET /launches", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get("/launches");
      expect(response.statusCode).toBe(200);
    });

    test("should respond with JSON content type", async () => {
      const response = await request(app).get("/launches");
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("should respond with an array", async () => {
      const response = await request(app).get("/launches");
      expect(Array.isArray(response.body)).toBe(true);
    });

    test("should include the default seeded launch", async () => {
      const response = await request(app).get("/launches");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            mission: "Kepler Exploration X",
            rocket: "Exlorer IS1",
            target: "Kepler-442 b",
            success: true,
            isUpcoming: true,
          }),
        ])
      );
    });

    test("should return at least one launch", async () => {
      const response = await request(app).get("/launches");
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // ─── POST /launches ───────────────────────────────────────────────────────
  describe("POST /launches", () => {
    const completeLaunch = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      launchDate: "January 4, 2028",
      target: "Kepler-442 b",
    };

    // ── Success cases ────────────────────────────────────────────────────────
    test("should respond with 201 status code when all required fields are provided", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunch);
      expect(response.statusCode).toBe(201);
    });

    test("should respond with JSON content type on success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunch);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    test("should return the created launch with success and isUpcoming flags", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunch);
      expect(response.body).toMatchObject({
        mission: completeLaunch.mission,
        rocket: completeLaunch.rocket,
        target: completeLaunch.target,
        success: true,
        isUpcoming: true,
      });
    });

    test("should store the launch date as a valid Date", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunch);
      expect(new Date(response.body.launchDate).toISOString()).not.toBe(
        "Invalid Date"
      );
    });

    test("should persist the new launch in GET /launches", async () => {
      const newLaunch = {
        mission: "Persisted Mission",
        rocket: "Atlas V",
        launchDate: "March 10, 2029",
        target: "Kepler-62 f",
      };
      await request(app).post("/launches").send(newLaunch);
      const response = await request(app).get("/launches");
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            mission: newLaunch.mission,
            rocket: newLaunch.rocket,
          }),
        ])
      );
    });

    // ── Missing required fields ───────────────────────────────────────────────
    test("should respond with 400 when mission is missing", async () => {
      const { mission, ...withoutMission } = completeLaunch;
      const response = await request(app)
        .post("/launches")
        .send(withoutMission);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    test("should respond with 400 when rocket is missing", async () => {
      const { rocket, ...withoutRocket } = completeLaunch;
      const response = await request(app)
        .post("/launches")
        .send(withoutRocket);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    test("should respond with 400 when launchDate is missing", async () => {
      const { launchDate, ...withoutDate } = completeLaunch;
      const response = await request(app)
        .post("/launches")
        .send(withoutDate);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    test("should respond with 400 when target is missing", async () => {
      const { target, ...withoutTarget } = completeLaunch;
      const response = await request(app)
        .post("/launches")
        .send(withoutTarget);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    test("should respond with 400 when request body is empty", async () => {
      const response = await request(app).post("/launches").send({});
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Missing required launch property" });
    });

    // ── Invalid launch date ───────────────────────────────────────────────────
    test("should respond with 400 when launchDate is not a valid date string", async () => {
      const response = await request(app)
        .post("/launches")
        .send({ ...completeLaunch, launchDate: "not-a-date" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Invalid launch date" });
    });

    test("should respond with 400 when launchDate is a random string", async () => {
      const response = await request(app)
        .post("/launches")
        .send({ ...completeLaunch, launchDate: "hello world" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ error: "Invalid launch date" });
    });
  });
});
