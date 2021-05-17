import Catalog from 'components/Catalog';
import { FC, useState } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCartContext, withCartContextProvider } from 'contexts/cart';
import Cart from 'components/Cart';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const { cart } = useCartContext();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalQuantity = cart && Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shop Example
          </Typography>
          <IconButton aria-label="add" color="inherit" aria-controls="menu-appbar" onClick={openCart}>
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Catalog />
      </Container>
      <Cart open={isCartOpen} onClose={closeCart} />
    </div>
  );
};

export default withCartContextProvider(App);
