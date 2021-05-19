import { within } from '@testing-library/dom';
import { act, fireEvent, screen } from '@testing-library/react';
import { ProductApiType } from 'models/ProductApiType';

export default function addToCart(product: ProductApiType, quantity: number): void {
  const element = screen.getByTitle(product.name);
  const addProduct = within(element).getByLabelText('add');

  for (let i = 1; i <= quantity; i++) {
    act(() => {
      fireEvent.click(addProduct);
    });
  }

  const addToCart = within(element).getByLabelText('addToCart');
  act(() => {
    fireEvent.click(addToCart);
  });
}
