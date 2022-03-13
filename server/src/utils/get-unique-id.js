import { v4 as uuid4 } from 'uuid';

export const getUniqueId = () => {
  return uuid4();
};
