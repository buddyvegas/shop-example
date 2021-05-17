import { api } from 'config';
import { ProductApiType } from 'models/ProductApiType';
import { get } from 'shared/requester';

export const getProducts = async (): Promise<ProductApiType[]> => {
  const path = api.get.products();

  const result = await get(path).fetch();

  return result.json();
};
