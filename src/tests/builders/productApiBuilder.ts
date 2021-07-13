import { ProductApiType } from 'models/ProductApiType';
import { v4 } from 'uuid';

export class ProductApiBuilder {
  private product = {} as ProductApiType;

  constructor() {
    this.product.id = v4();
    this.product.image = 'http://fakeimage/product.jpg';
  }

  withName(name: string): ProductApiBuilder {
    this.product.name = name;
    return this;
  }

  pomme(): ProductApiBuilder {
    this.product.name = 'Pomme';
    return this;
  }

  kiwi(): ProductApiBuilder {
    this.product.name = 'Kiwi';
    return this;
  }

  build(): ProductApiType {
    return this.product;
  }
}
