/*
  ce fichier simule la configuration de nos routes vers une api fictive
*/

const apiUrl = 'http://fakeapi/';

export const api = {
  get: {
    products: (): string => `${apiUrl}/products`,
  },
  post: {
    purchase: (): string => `${apiUrl}/purchase`,
  },
};
