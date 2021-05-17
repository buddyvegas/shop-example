import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import React, { createContext, FC, useContext, useMemo, useReducer } from 'react';
import { addItemWith, CartReducer, emptyCartWith, removeItemWith } from './reducers/cartReducer';

export type CartContextType = {
  cart: Record<string, ItemCartType>;
};

export type CartActionsContextType = {
  addItem: (product: ProductApiType, quantity: number) => void;
  removeItem: (id: string) => void;
  emptyCart: () => void;
};

export const CartContext = createContext<CartContextType>({} as CartContextType);
CartContext.displayName = 'CartContext';

const CartActionsContext = createContext<CartActionsContextType>({} as CartActionsContextType);
CartActionsContext.displayName = 'CartActionsContext';

export const useCartContext = (): CartContextType => useContext(CartContext);
export const useCartActionsContext = (): CartActionsContextType => useContext(CartActionsContext);

export const CartContextProvider: FC = ({ children }) => {
  const [cart, dispatchCart] = useReducer(CartReducer, {});

  const addItem = (product: ProductApiType, quantity: number): void => {
    addItemWith(dispatchCart)(product, quantity);
  };

  const removeItem = (id: string): void => {
    removeItemWith(dispatchCart)(id);
  };

  const emptyCart = (): void => {
    emptyCartWith(dispatchCart)();
  };

  const states: CartContextType = { cart };

  const actions = useMemo<CartActionsContextType>(() => ({ addItem, removeItem, emptyCart }), []);

  return (
    <CartActionsContext.Provider value={actions}>
      <CartContext.Provider value={states}>{children}</CartContext.Provider>
    </CartActionsContext.Provider>
  );
};

export function withCartContextProvider<T>(WrapperComponent: React.ComponentType<T>): React.ComponentType<T> {
  const CartContextContainer: React.ComponentType<T> = (props) => (
    <CartContextProvider>
      <WrapperComponent {...props} />
    </CartContextProvider>
  );

  return CartContextContainer;
}
