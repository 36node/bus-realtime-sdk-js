const { genSnapshot } = require("./vehicle");

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = { "/vehicles/*/snapshot": "/snapshot" };

/**
 * mock log service
 *
 * @param {object} opts 参数
 * @param {number} opts.some 参数 某个参数 目前没意义
 */
function mock({ some = 100 }) {
  return {
    /**
     * mock data
     */
    db: {
      snapshot: genSnapshot(),
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
}

module.exports = mock;
