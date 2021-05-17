import { api } from 'config';
import { ItemCartType } from 'models/ItemCartType';
import { post } from 'shared/requester';

export const purchaseAsync = async (cart: Record<string, ItemCartType>): Promise<boolean> => {
  const path = api.post.purchase();

  const result = await post(path, cart).fetch();

  return result.ok;
};
