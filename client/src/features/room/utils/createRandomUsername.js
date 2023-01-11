import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

export const createRandomUsername = () => {
  return uniqueNamesGenerator({
    style: 'capital',
    separator: '',
    dictionaries: [colors, animals],
    length: 2,
  });
};
