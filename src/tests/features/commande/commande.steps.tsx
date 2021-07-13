import { screen } from '@testing-library/react';
import { api } from 'config';
import { StepDefinitions } from 'jest-cucumber';
import { rest } from 'msw';
import purchase from 'tests/actions/purchase';
import { server } from 'tests/mocks/server';

export const commandeSteps = (): StepDefinitions => {
  return ({ when, then }) => {
    when('le client passe commande avec succés', () => {
      server.use(
        rest.post(api.post.purchase(), (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );

      purchase();
    });

    when('la commande du client échoue', () => {
      server.use(
        rest.post(api.post.purchase(), (req, res, ctx) => {
          return res(ctx.status(500));
        }),
      );

      purchase();
    });

    then('ses achats ont bien été effectué', async () => {
      await screen.findByText('Votre commande est terminée. Merci pour votre achat.');
    });

    then("un message d'erreur est affiché", async () => {
      await screen.findByText('Une erreur est survenue. Veuillez reéessayer.');
    });
  };
};
