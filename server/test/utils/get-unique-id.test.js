import { expect } from 'chai';

import { getUniqueId } from '../../src/utils/get-unique-id.js';

describe('[UTILS] Util: "get-unique-id" tests', () => {
  it('creates unique id', async () => {
    const id = getUniqueId();

    expect(id).to.be.a('string');
    expect(id).to.have.lengthOf(8);
  });

  it('creates unique id with custom length', async () => {
    const id = getUniqueId(20);

    expect(id).to.be.a('string');
    expect(id).to.have.lengthOf(20);
  });
});
