import { act, fireEvent, screen, within } from '@testing-library/react';
import { ProductApiType } from 'models/ProductApiType';

export default function removeFromCart(product: ProductApiType): void {
  const cart = screen.getByRole('dialog', { name: 'Panier' });
  const element = within(cart).getByText(product.name).parentElement?.parentElement as HTMLElement;
  const button = within(element).getByLabelText('remove');
  act(() => {
    fireEvent.click(button);
  });
}
