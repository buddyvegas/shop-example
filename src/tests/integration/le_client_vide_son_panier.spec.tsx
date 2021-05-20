import { server } from 'tests/mocks/server';
import { rest } from 'msw';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { api } from 'config';
import { screen, render } from '@testing-library/react';
import App from 'App';
import addToCart from 'tests/actions/addToCart';
import openCart from 'tests/actions/openCart';
import removeFromCart from 'tests/actions/removeFromCart';
import catalogIsReady from 'tests/actions/catalogIsReady';

test('le client vide son panier après avoir ajouté 2 pommes et 3 kiwis', async () => {
  const pomme = new ProductApiBuilder().pomme().build();
  const kiwi = new ProductApiBuilder().kiwi().build();

  const catalog = [pomme, kiwi];

  server.use(
    rest.get(api.get.products(), (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(catalog));
    }),
  );

  render(<App />);
  await catalogIsReady(catalog);

  addToCart(pomme, 2);
  addToCart(kiwi, 3);

  openCart();

  removeFromCart(pomme);
  removeFromCart(kiwi);

  expect(screen.getByText('Le panier est vide')).toBeInTheDocument();
});
