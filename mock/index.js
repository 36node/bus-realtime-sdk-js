const { genSnapshot, genSnapshots, genStatistics } = require("./vehicle");
const faker = require("faker");

const defaultVehicles = [
  {
    id: "LZYTAGBW2E1054491",
    line: "1路",
    ns: "/pudong/com1",
    no: "12132",
    plate: "沪N09999",
    producer: "shenwo",
  },
  {
    id: "LZYTAGBW2E1054492",
    line: "12路",
    ns: "/pudong/com1",
    no: "234235",
    plate: "沪N09998",
    producer: "shenwo",
  },
  {
    id: "LZYTAGBW2E1054493",
    line: "13路",
    ns: "/pudong/com2",
    no: "12139",
    plate: "沪N09997",
    producer: "yutong",
  },
];

const myRouter = (req, res, next) => {
  /** example */
  next();
};

const rewrites = {
  "/vehicle/snapshots/*": "/snapshot",
  "/vehicle/snapshots*": "/snapshots$1",
  "/vehicle/statistics*": "/vehicleStatistics$1",
};

/**
 * mock realtime service
 *
 * @param {object} opts 参数
 * @param {number} opts.count 产生车辆快照的数量
 * @param {[string]} opts.vehicles 按照给定车辆数组产生快照数据
 */
function mock({ count = 1000, vehicles = defaultVehicles }) {
  return {
    /**
     * mock data
     */
    db: {
      snapshot: genSnapshot(faker.random.arrayElement(vehicles)),
      snapshots: genSnapshots({ count, vehicles }),
      vehicleStatistics: genStatistics(),
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
}

module.exports = mock;
