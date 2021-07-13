import { render } from '@testing-library/react';
import App from 'App';
import { api } from 'config';
import { StepDefinitions } from 'jest-cucumber';
import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import { rest } from 'msw';
import addToCart from 'tests/actions/addToCart';
import catalogIsReady from 'tests/actions/catalogIsReady';
import openCart from 'tests/actions/openCart';
import { ProductApiBuilder } from 'tests/builders/productApiBuilder';
import { server } from 'tests/mocks/server';
import { IScenarioContext } from './scenarioContext';

export const commonSteps = (context: IScenarioContext): StepDefinitions => {
  return ({ given, and }) => {
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

    and(/^le client ajoute (\d+) "(.*)" à son panier$/, (quantité: number, nom: string) => {
      const catalog = context.get<ProductApiType[]>('catalog');
      const panier = context.get<ItemCartType[]>('panier') || [];

      const fruit = catalog.find((p) => p.name === nom) as ProductApiType;
      addToCart(fruit, quantité);

      panier.push({
        product: fruit,
        quantity: quantité,
      });
      context.set('panier', panier);
    });

    and('le client ouvre son panier', () => {
      openCart();
    });
  };
};
