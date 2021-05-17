import { FC, memo } from 'react';
import { ProductApiType } from 'models/ProductApiType';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddToCart from 'components/AddToCart';

type ProductPropsType = {
  product: ProductApiType;
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: '1rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  image: {
    width: 150,
    height: 150,
  },
}));

const Product: FC<ProductPropsType> = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.image} image={product.image} title={product.name} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography paragraph variant="h5">
            {product.name}
          </Typography>
        </CardContent>
        <AddToCart product={product} />
      </div>
    </Card>
  );
};

export default memo(Product);
