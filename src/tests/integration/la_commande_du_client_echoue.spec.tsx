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

test('la commande du client échoue', async () => {
  const pomme = new ProductApiBuilder().withName('Pomme').build();
  const poire = new ProductApiBuilder().withName('Poire').build();

  const catalog = [pomme, poire];

  server.use(
    rest.get(api.get.products(), (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(catalog));
    }),
    rest.post(api.post.purchase(), (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<App />);
  await catalogIsReady(catalog);

  addToCart(pomme, 2);
  addToCart(poire, 3);

  openCart();

  purchase();

  await screen.findByText('Une erreur est survenue. Veuillez reéessayer.');
});
