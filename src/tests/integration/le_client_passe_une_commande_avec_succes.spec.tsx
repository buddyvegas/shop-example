import { render, screen } from '@testing-library/react';
import App from 'App';
import { api } from 'config';
import { rest } from 'msw';
import addToCart from 'tests/actions/addToCart';
import catalogIsReady from 'tests/actions/catalogIsReady';
import openCart from 'tests/actions/openCart';
import purchase from 'tests/actions/purchase';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { server } from 'tests/mocks/server';

test('le client commande 2 pommes et 3 kiwis', async () => {
  const pomme = new ProductApiBuilder().pomme().build();
  const kiwi = new ProductApiBuilder().kiwi().build();

  const catalog = [pomme, kiwi];

  server.use(
    rest.get(api.get.products(), (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(catalog));
    }),
    rest.post(api.post.purchase(), (req, res, ctx) => {
      return res(ctx.status(200));
    }),
  );

  render(<App />);
  await catalogIsReady(catalog);

  addToCart(pomme, 2);
  addToCart(kiwi, 3);

  openCart();

  purchase();

  await screen.findByText('Votre commande est terminée. Merci pour votre achat.');
});
