const { genSnapshots } = require("./vehicle");

const myRouter = (req, res, next) => {
  /** example */
  next();
};

const rewrites = {
  "/vehicle/snapshots*": "/snapshots$1",
};

/**
 * mock log service
 *
 * @param {object} opts 参数
 * @param {number} opts.count 产生车辆快照的数量
 * @param {[string]} opts.vins 按照给定车辆的 vin 数组产生快照数据
 */
function mock({ count = 100, vins = ["LZYTAGBW2E1054491"] }) {
  return {
    /**
     * mock data
     */
    db: {
      snapshots: genSnapshots({ count, vins }),
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
}

module.exports = mock;
