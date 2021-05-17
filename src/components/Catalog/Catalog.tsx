import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Product from 'components/Product';
import { ProductApiType } from 'models/ProductApiType';
import { FC, useEffect, useState, memo } from 'react';
import { getProducts } from 'services/product.service';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
}));

const Catalog: FC = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<ProductApiType[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      setProducts(await getProducts());
    })();
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={6}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(Catalog);
