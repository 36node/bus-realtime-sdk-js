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
    expect(result.body).toHaveProperty("no");
    expect(result.body).toHaveProperty("plate");
    expect(result.body).toHaveProperty("producer");
    expect(result.body).toHaveProperty("line");
  });

  it("should list snapshots", async () => {
    const result = await sdk.vehicle.listSnapshots({
      query: {
        limit: 2,
        vin: "LZYTAGBW2E1054491",
      },
    });

    expect(result.body.length).toBe(2);
  });

  it("should list snapshots by vins ", async () => {
    const result = await sdk.vehicle.listSnapshots({
      query: {
        vin: ["LZYTAGBW2E1054491", "LZYTAGBW2E1054492"],
      },
    });

    for (const snapshot of result.body) {
      expect(
        ["LZYTAGBW2E1054491", "LZYTAGBW2E1054492"].includes(snapshot.vin)
      ).toBe(true);
    }
  });

  it("should get statistics", async () => {
    const result = await sdk.vehicle.getStatistics({
      query: {
        line: "110",
      },
    });

    expect(result.body).toHaveProperty("alertLevel3");
    expect(result.body).toHaveProperty("alertLevel3Max");
    expect(result.body).toHaveProperty("charging");
    expect(result.body).toHaveProperty("chargingMax");
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
