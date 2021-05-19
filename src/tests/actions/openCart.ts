import { act, fireEvent, screen } from '@testing-library/react';

export default function openCart(): void {
  const button = screen.getByLabelText('open-cart');
  act(() => {
    fireEvent.click(button);
  });
}
