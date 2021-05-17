import { rest } from 'msw';
import { api } from 'config';
import products from './responses/products.json';

export default [
  rest.get(api.get.products(), (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(200), ctx.json(products));
  }),
  rest.post(api.post.purchase(), (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(200));
  }),
];
