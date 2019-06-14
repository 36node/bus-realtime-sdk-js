import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK vehicle", () => {
  it("must provide vehicleId", () => {
    const getSnapshot = () => sdk.vehicle.getSnapshot();
    expect(getSnapshot).toThrow("vehicleId is required for getSnapshot");
  });

  it("should get snapshot", async () => {
    const result = await sdk.vehicle.getSnapshot({
      vehicleId: "xxxxxx",
      query: { select: ["vin", "vehicle", "time", "at"] },
    });
    expect(result.body).toHaveProperty("vin");
    expect(result.body).toHaveProperty("vehicle");
    expect(result.body).toHaveProperty("time");
    expect(result.body).toHaveProperty("at");
  });
});
