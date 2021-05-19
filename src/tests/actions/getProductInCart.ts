import { screen, within } from '@testing-library/react';
import { ProductApiType } from 'models/ProductApiType';

export default function getProductInCart(product: ProductApiType): HTMLElement {
  const cart = screen.getByRole('dialog', { name: 'Panier' });
  return within(cart).getByText(product.name).parentElement as HTMLElement;
}
