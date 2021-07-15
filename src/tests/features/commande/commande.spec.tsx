import { render, screen } from '@testing-library/react';
import App from 'App';
import { api } from 'config';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import { rest } from 'msw';
import addToCart from 'tests/actions/addToCart';
import catalogIsReady from 'tests/actions/catalogIsReady';
import openCart from 'tests/actions/openCart';
import purchase from 'tests/actions/purchase';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { server } from 'tests/mocks/server';
import { IScenarioContext, ScenarioContext } from '../scenarioContext';

const feature = loadFeature('src/tests/features/commande/commande.feature');

defineFeature(feature, (test) => {
  let context: IScenarioContext;

  beforeEach(() => {
    context = new ScenarioContext();
  });

  test('Le client passe une commande avec succés', ({ given, and, when, then }) => {
    given('les fruits suivants sont présents dans le catalogue', (table) => {
      const catalog: ProductApiType[] = [];
      table.forEach((row: { fruit: string }) => {
        catalog.push(new ProductApiBuilder().withName(row.fruit).build());
      });

      server.use(
        rest.get(api.get.products(), (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(catalog));
        }),
      );

      context.set<ProductApiType[]>('catalog', catalog);
    });

    given('le client arrive sur le catalogue', async () => {
      const catalog = context.get<ProductApiType[]>('catalog');
      render(<App />);
      await catalogIsReady(catalog);
    });

    and('il ajoute les produits suivants à son panier', (table) => {
      const catalog = context.get<ProductApiType[]>('catalog');
      const panier = context.get<ItemCartType[]>('panier') || [];

      table.forEach((row: { fruit: string; quantité: number }) => {
        const fruit = catalog.find((p) => p.name === row.fruit) as ProductApiType;
        addToCart(fruit, row.quantité);

        panier.push({
          product: fruit,
          quantity: row.quantité,
        });
      });

      context.set('panier', panier);
    });

    and('il ouvre son panier', () => {
      openCart();
    });

    when('il passe commande', () => {
      server.use(
        rest.post(api.post.purchase(), (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );

      purchase();
    });

    then('ses achats ont bien été effectué', async () => {
      await screen.findByText('Votre commande est terminée. Merci pour votre achat.');
    });
  });

  test('la commande du client échoue', ({ given, and, when, then }) => {
    given('les fruits suivants sont présents dans le catalogue', (table) => {
      const catalog: ProductApiType[] = [];
      table.forEach((row: { fruit: string }) => {
        catalog.push(new ProductApiBuilder().withName(row.fruit).build());
      });

      server.use(
        rest.get(api.get.products(), (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(catalog));
        }),
      );

      context.set<ProductApiType[]>('catalog', catalog);
    });

    given('le client arrive sur le catalogue', async () => {
      const catalog = context.get<ProductApiType[]>('catalog');
      render(<App />);
      await catalogIsReady(catalog);
    });

    and('il ajoute les produits suivants à son panier', (table) => {
      const catalog = context.get<ProductApiType[]>('catalog');
      const panier = context.get<ItemCartType[]>('panier') || [];

      table.forEach((row: { fruit: string; quantité: number }) => {
        const fruit = catalog.find((p) => p.name === row.fruit) as ProductApiType;
        addToCart(fruit, row.quantité);

        panier.push({
          product: fruit,
          quantity: row.quantité,
        });
      });

      context.set('panier', panier);
    });

    and('il ouvre son panier', () => {
      openCart();
    });

    when('la commande du client échoue', () => {
      server.use(
        rest.post(api.post.purchase(), (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      purchase();
    });

    then("un message d'erreur est affiché", async () => {
      await screen.findByText('Une erreur est survenue. Veuillez reéessayer.');
    });
  });
});
