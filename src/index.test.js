import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK vehicle", () => {
  it("must provide vehicleId", () => {
    const getSnapshot = () => sdk.vehicle.getSnapshot();

    expect(getSnapshot).toThrow("vehicleId is required for getSnapshot");
  });

  it("should get snapshot", async () => {
    const result = await sdk.vehicle.getSnapshot({
      vehicleId: "LZYTAGBW2E1054491",
    });

    expect(result.body).toHaveProperty("vin");
    expect(result.body).toHaveProperty("vehicle");
    expect(result.body).toHaveProperty("time");
    expect(result.body).toHaveProperty("at");
  });

  it("should list snapshots", async () => {
    const result = await sdk.vehicle.listSnapshots({
      query: {
        limit: 10,
        vin: "LZYTAGBW2E1054491",
      },
    });

    expect(result.body.length).toBe(10);
  });

  it("should get statistics", async () => {
    const result = await sdk.vehicle.getStatistics({
      query: {
        line: "110",
      },
    });

    expect(result.body).toHaveProperty("alarmLevel3");
    expect(result.body).toHaveProperty("alarmLevel3Max");
    expect(result.body).toHaveProperty("charging");
    expect(result.body).toHaveProperty("chargingMax");
    expect(result.body).toHaveProperty("level3Total");
    expect(result.body).toHaveProperty("offline");
    expect(result.body).toHaveProperty("offlineMax");
    expect(result.body).toHaveProperty("online");
    expect(result.body).toHaveProperty("onlineMax");
    expect(result.body).toHaveProperty("onsite");
    expect(result.body).toHaveProperty("repairing");
    expect(result.body).toHaveProperty("repairingMax");
    expect(result.body).toHaveProperty("totalMileage");
  });
});
