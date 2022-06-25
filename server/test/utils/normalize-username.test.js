import { expect } from 'chai';

import { normalizeUsername } from '../../src/utils/normalize-username.js';

describe('Util: "normalize-username" tests', () => {
  it('removes non-alphanumeric characters from username', async () => {
    const normalizedUsername = normalizeUsername('!!#username??');

    expect(normalizedUsername).to.equal('username');
  });

  it('converts username to lowercase', async () => {
    const normalizedUsername = normalizeUsername('UseRName');

    expect(normalizedUsername).to.equal('username');
  });
});
