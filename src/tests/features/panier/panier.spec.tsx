import { render, screen, within } from '@testing-library/react';
import App from 'App';
import { api } from 'config';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import { rest } from 'msw';
import addToCart from 'tests/actions/addToCart';
import catalogIsReady from 'tests/actions/catalogIsReady';
import getProductInCart from 'tests/actions/getProductInCart';
import openCart from 'tests/actions/openCart';
import removeFromCart from 'tests/actions/removeFromCart';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { server } from 'tests/mocks/server';
import { IScenarioContext, ScenarioContext } from '../scenarioContext';

const feature = loadFeature('src/tests/features/panier/panier.feature');

defineFeature(feature, (test) => {
  let context: IScenarioContext;

  beforeEach(() => {
    context = new ScenarioContext();
  });

  test('Le client ajoute des produits à son panier', ({ given, and, when, then }) => {
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
      table.forEach((row: { fruit: string; quantité: number }) => {
        const fruit = catalog.find((p) => p.name === row.fruit) as ProductApiType;
        addToCart(fruit, row.quantité);
      });
    });

    when('il ouvre son panier', () => {
      openCart();
    });

    then('les produits suivants sont présents dans son panier', (table) => {
      table.forEach((row: { fruit: string; quantité: number }) => {
        const fruit = context.get<ProductApiType[]>('catalog')?.find((p) => p.name === row.fruit) as ProductApiType;

        expect(within(getProductInCart(fruit)).getByText(`quantité : ${row.quantité}`)).toBeInTheDocument();
      });
    });
  });

  test('Le client vide son panier', ({ given, and, when, then }) => {
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

    when('il vide son panier', () => {
      openCart();

      const panier = context.get<ItemCartType[]>('panier');
      panier.forEach(({ product }) => removeFromCart(product));
    });

    then('un message indique que son panier est vide', () => {
      screen.getByText('Le panier est vide');
    });
  });
});
