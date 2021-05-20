import { render, within } from '@testing-library/react';
import App from 'App';
import { api } from 'config';
import { rest } from 'msw';
import addToCart from 'tests/actions/addToCart';
import catalogIsReady from 'tests/actions/catalogIsReady';
import getProductInCart from 'tests/actions/getProductInCart';
import openCart from 'tests/actions/openCart';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { server } from 'tests/mocks/server';

test('le client ajoute 2 pommes et 3 kiwis à son panier', async () => {
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

  expect(within(getProductInCart(pomme)).getByText('quantité : 2')).toBeInTheDocument();
  expect(within(getProductInCart(kiwi)).getByText('quantité : 3')).toBeInTheDocument();
});
