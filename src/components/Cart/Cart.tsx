import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCartActionsContext, useCartContext } from 'contexts/cart';
import { FC, useState } from 'react';
import { purchaseAsync } from 'services/purchase.service';

type CartPropsType = {
  open: boolean;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({
  empty: {
    padding: '0 2rem',
  },
  item: {
    width: 200,
  },
}));

const Cart: FC<CartPropsType> = ({ open, onClose }) => {
  const classes = useStyles();
  const { cart } = useCartContext();
  const { removeItem, emptyCart } = useCartActionsContext();
  const [isCommandComplete, setIsCommandComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

  const retry = () => {
    setIsCommandComplete(false);
    setHasError(false);
  };

  const purchase = async () => {
    const isPurchaseOk = await purchaseAsync(cart);
    if (isPurchaseOk) {
      emptyCart();
      setIsCommandComplete(true);
    } else {
      setHasError(true);
    }
  };

  const close = () => {
    onClose();
    setIsCommandComplete(false);
    setHasError(false);
  };

  if (hasError) {
    return (
      <Dialog aria-labelledby="cart" open={open} onClose={close}>
        <DialogTitle id="cart">Une erreur est survenue. Veuillez reéessayer.</DialogTitle>
        <DialogActions>
          <Button onClick={retry} variant="contained" color="primary">
            Réessayer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (isCommandComplete) {
    return (
      <Dialog aria-labelledby="cart" open={open} onClose={close}>
        <DialogTitle id="cart">Votre commande est terminée. Merci pour votre achat.</DialogTitle>
      </Dialog>
    );
  }

  return (
    <Dialog aria-labelledby="cart" open={open} onClose={close}>
      <DialogTitle id="cart">Panier</DialogTitle>
      {Object.values(cart).length === 0 ? (
        <Typography paragraph className={classes.empty}>
          Le panier est vide
        </Typography>
      ) : (
        <>
          <List>
            {Object.values(cart).map((item) => (
              <ListItem key={item.product.id}>
                <ListItemAvatar>
                  <Avatar src={item.product.image} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.item}
                  primary={item.product.name}
                  secondary={`quantité : ${item.quantity}`}
                />
                <ListItemIcon>
                  <IconButton onClick={() => removeItem(item.product.id)} aria-label="remove">
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={purchase} variant="contained" color="primary" aria-label="purchase">
              Commander
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default Cart;
