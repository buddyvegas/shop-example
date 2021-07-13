import { within, screen } from '@testing-library/react';
import { StepDefinitions } from 'jest-cucumber';
import { ItemCartType } from 'models/ItemCartType';
import { ProductApiType } from 'models/ProductApiType';
import getProductInCart from 'tests/actions/getProductInCart';
import openCart from 'tests/actions/openCart';
import removeFromCart from 'tests/actions/removeFromCart';
import { IScenarioContext } from '../scenarioContext';

export const panierSteps = (context: IScenarioContext): StepDefinitions => {
  return ({ when, then }) => {
    when('le client visualise son panier', () => {
      openCart();
    });

    when('il vide son panier', () => {
      const panier = context.get<ItemCartType[]>('panier');
      panier.forEach(({ product }) => removeFromCart(product));
    });

    then(/^il possède (\d+) "(.*)" dans son panier$/, (quantité: string, nom: string) => {
      const fruit = context.get<ProductApiType[]>('catalog')?.find((p) => p.name === nom) as ProductApiType;

      expect(within(getProductInCart(fruit)).getByText(`quantité : ${quantité}`)).toBeInTheDocument();
    });

    then('un message indique que son panier est vide', () => {
      screen.getByText('Le panier est vide');
    });
  };
};
