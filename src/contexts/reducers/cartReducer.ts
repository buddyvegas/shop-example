import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import { Dispatch } from 'react';

enum ActionsType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_ITEM = 'REMOVE_ITEM',
  EMPTY_CART = 'EMPTY_CART',
}

type AddToCartAction = {
  type: ActionsType.ADD_TO_CART;
  payload: {
    product: ProductApiType;
    quantity: number;
  };
};

type RemoveItemAction = {
  type: ActionsType.REMOVE_ITEM;
  payload: {
    id: string;
  };
};

type EmptyCartAction = {
  type: ActionsType.EMPTY_CART;
};

export type CartActions = AddToCartAction | RemoveItemAction | EmptyCartAction;

export function CartReducer(state: Record<string, ItemCartType>, action: CartActions): Record<string, ItemCartType> {
  switch (action.type) {
    case ActionsType.ADD_TO_CART: {
      const quantity = state[action.payload.product.id]
        ? state[action.payload.product.id].quantity + action.payload.quantity
        : action.payload.quantity;

      return {
        ...state,
        [action.payload.product.id]: {
          product: action.payload.product,
          quantity,
        },
      };
    }

    case ActionsType.REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }

    case ActionsType.EMPTY_CART: {
      return {};
    }

    default:
      return state;
  }
}

export const addItemWith =
  (dispatch: Dispatch<CartActions>) =>
  (product: ProductApiType, quantity: number): void => {
    dispatch({
      type: ActionsType.ADD_TO_CART,
      payload: {
        product,
        quantity,
      },
    });
  };

export const removeItemWith =
  (dispatch: Dispatch<CartActions>) =>
  (id: string): void => {
    dispatch({
      type: ActionsType.REMOVE_ITEM,
      payload: {
        id,
      },
    });
  };

export const emptyCartWith = (dispatch: Dispatch<CartActions>) => (): void => {
  dispatch({
    type: ActionsType.EMPTY_CART,
  });
};
