
import axios from 'axios';
import axiosRetry from 'axios-retry';

import assert from './helpers/assert';

axiosRetry(axios, { retries: 3 });

/**
 * Expose an `Incursu` client.
 */
export default class Incursu {
  /**
   * Initialize a new `Incursu` with your Segment project's `writeKey` and an
   * optional dictionary of `options`.
   *
   * @param {String} writeKey
   * @param {Object} options (optional)
   *   @property {Number} flushAt (default: 20)
   *   @property {Number} flushAfter (default: 10000)
   *   @property {String} host (default: 'https://api.segment.io')
   */

  constructor(
    writeKey,
    {
      host = Incursu.DEFAULT_HOST,
      flushAt = Incursu.DEFAULT_FLUSH_AT,
      flushAfter = Incursu.DEFAULT_FLUSH_AFTER,
    } = {},
  ) {
    assert(
      writeKey,
      'You must pass your Segment project\'s write key.',
    );

    this.queue = [];

    this.writeKey = writeKey;

    this.host = host;
    this.flushAt = Math.max(flushAt, 1);
    this.flushAfter = flushAfter;
  }

  /**
   * Send an identify `message`.
   *
   * @param {Object} message
   * @return {Incursu}
   */

  register(message) {
    this.post('register', message);

    return this;
  }


  /**
   * Send a track `message`.
   *
   * @param {Object} message
   * @return {Incursu}
   */

  track(message) {
    this.post('track', message);

    return this;
  }


  post(action, msg) {

    axios(
      `${this.host}/${action}`,
      {
        msg,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Api-Key': this.writeKey,
        },
      },
    )
  }
}

Incursu.DEFAULT_HOST = 'https://api.incursu.com/v1/client/';

Incursu.DEFAULT_FLUSH_AT = 20;

Incursu.DEFAULT_FLUSH_AFTER = 10000;