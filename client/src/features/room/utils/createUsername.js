import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export const createUsername = () => {
  return uniqueNamesGenerator({
    style: 'capital',
    separator: '',
    dictionaries: [adjectives, animals],
    length: 2,
  });
};
