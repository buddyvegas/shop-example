import { ProductApiType } from 'models/ProductApiType';
import { FC, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCartActionsContext } from 'contexts/cart';

type AddToCartPropsType = {
  product: ProductApiType;
  quantity?: number;
};

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
  },
}));

const AddToCart: FC<AddToCartPropsType> = ({ product, quantity }) => {
  const classes = useStyles();
  const { addItem } = useCartActionsContext();
  const [currentQuantity, setCurrentQuantity] = useState(quantity ?? 0);

  const remove = () => {
    if (currentQuantity > 0) {
      setCurrentQuantity(currentQuantity - 1);
    }
  };

  const add = () => {
    if (currentQuantity < 9) {
      setCurrentQuantity(currentQuantity + 1);
    }
  };

  const addToCart = () => {
    if (currentQuantity > 0) {
      addItem(product, currentQuantity);
    }
  };

  return (
    <div className={classes.controls}>
      <IconButton aria-label="remove" onClick={remove}>
        <RemoveIcon />
      </IconButton>
      <Typography>{currentQuantity}</Typography>
      <IconButton aria-label="add" onClick={add}>
        <AddIcon />
      </IconButton>
      <IconButton aria-label="addToCart" onClick={addToCart}>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
};

export default AddToCart;
