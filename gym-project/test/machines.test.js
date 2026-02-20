const request = require("supertest");
const app = require("../src/app");

describe("GymVisionAPI", () => {
  test("GET /health -> 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /machines -> returns list of machines", async () => {
    const res = await request(app).get("/machines");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(5);
  });

  test("GET /machines/:id -> returns one machine", async () => {
    const res = await request(app).get("/machines/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("name");
  });

  test("GET /machines/:id unknown -> 404", async () => {
    const res = await request(app).get("/machines/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /scan/:code -> returns scanned machine", async () => {
    const res = await request(app).get("/scan/LEG_PRESS_001");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("scanned", true);
    expect(res.body.machine).toHaveProperty("code", "LEG_PRESS_001");
  });

  test("GET /scan/:code unknown -> 404", async () => {
    const res = await request(app).get("/scan/UNKNOWN_CODE");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});