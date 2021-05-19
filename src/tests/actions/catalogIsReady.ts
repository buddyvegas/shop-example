import { screen } from '@testing-library/react';
import { ProductApiType } from 'models/ProductApiType';

export default async function catalogIsReady(catalog: ProductApiType[]): Promise<void> {
  for (const product of catalog) {
    await screen.findByText(product.name);
  }
}
