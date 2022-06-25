import { expect } from 'chai';

import { getTimestamp } from '../../src/utils/get-timestamp.js';

describe('Util: "get-timestamp" tests', () => {
  it('creates timestamp', async () => {
    const timestamp = getTimestamp();

    expect(timestamp).to.be.a('number');
    expect(timestamp).to.be.greaterThan(0);
  });
});
