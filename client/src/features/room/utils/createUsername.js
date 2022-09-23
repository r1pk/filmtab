import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

export const createUsername = () => {
  return uniqueNamesGenerator({
    style: 'capital',
    separator: '',
    dictionaries: [colors, animals],
    length: 2,
  });
};
