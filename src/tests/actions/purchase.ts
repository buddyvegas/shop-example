import { act, fireEvent, screen, within } from '@testing-library/react';

export default function purchase(): void {
  const cart = screen.getByRole('dialog', { name: 'Panier' });
  const button = within(cart).getByLabelText('purchase');
  act(() => {
    fireEvent.click(button);
  });
}
