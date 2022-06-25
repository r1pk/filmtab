import { expect } from 'chai';

import { createUserColor } from '../../src/utils/create-user-color.js';

describe('Util: "create-user-color" tests', () => {
  it('creates color in hsl format based on username', async () => {
    const color = createUserColor('username');

    expect(color).to.be.a('string');
    expect(color).to.have.length.greaterThan(5);
    expect(color).to.include('hsl');
  });

  it('creates color with custom saturation', async () => {
    const color = createUserColor('username', 0.5);

    expect(color).to.include('50%');
  });

  it('creates color with custom saturation and lightness', async () => {
    const color = createUserColor('username', 0.2, 0.6);

    expect(color).to.include('20%');
    expect(color).to.include('60%');
  });
});
