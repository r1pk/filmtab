import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

export const generateDefaultUsername = () => {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: ''
  });
};
