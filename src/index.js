import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    if (this.token) {
      return `Bearer ${this.token}`;
    }

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token fro authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

  /**
   * vehicle's methods
   */
  vehicle = {
    /**
     * Get a snapshot of an vehicle from realtime data
     *
     * @param {GetSnapshotRequest} req getSnapshot request
     * @returns {Promise<GetSnapshotResponse>} A snapshot of an vehicle
     */
    getSnapshot: (req = {}) => {
      const { vehicleId, query, headers } = req;

      if (!vehicleId) throw new Error("vehicleId is required for getSnapshot");

      return fetch(`${this.base}/vehicle/snapshots/${vehicleId}`, {
        method: "get",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * List all vehicle snapshots from realtime data
     *
     * @param {ListSnapshotsRequest} req listSnapshots request
     * @returns {Promise<ListSnapshotsResponse>} A paged array of vehicle snapshots
     */
    listSnapshots: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/vehicle/snapshots`, {
        method: "get",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
