import { expect } from 'chai';

import { normalizeMessageContent } from '../../src/utils/normalize-message-content.js';

describe('Util: "normalize-message-content" tests', () => {
  it('trims spaces from beginning and end of string', async () => {
    const normalizedContent = normalizeMessageContent('  Hello world!  ');

    expect(normalizedContent).to.equal('Hello world!');
  });

  it('removes multiple spaces from string', async () => {
    const normalizedContent = normalizeMessageContent('Hello  world!');

    expect(normalizedContent).to.equal('Hello world!');
  });
});
