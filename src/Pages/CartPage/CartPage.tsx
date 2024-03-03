import { Button, Typography } from '@mui/material';
import { useCartContext } from '../../Context/CartContext';
import makeStyles from '../../makeStyles';
import CartProduct from '../../Components/CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '30px',
    marginTop: '30px',
    backgroundColor: palette.grey[200],
    padding: spacing(9),
    width: '100%',
    borderRadius: '5px',
    [breakpoints.down('sm')]: {
      padding: spacing(3),
      marginTop: '20px',
      borderRadius: '0',
      gap: '10px',
      margin: '0',
      backgroundColor: 'transparent',
    },
  },
  title: {
    color: palette.primary.main,
    fontWeight: 'bold',
    fontSize: '30px',
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    borderBottom: `1px solid ${palette.grey[400]}`,
    padding: spacing(2),
    '& img': {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
      borderRadius: '10px',
    },
  },
  subtitle: {
    fontSize: '18px',
    color: palette.primary.light,
    '& span': {
      color: palette.secondary.main,
      padding: '0 5px',
    },
    [breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  product: {
    display: 'flex',
    gap: '20px',
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
  },
  counterSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  countBtn: {
    padding: '5px',
    width: '20px',
    height: '30px',
  },
  deleteCart: {
    padding: spacing(2),
    width: '25%',
    alignSelf: 'end',
    [breakpoints.down('sm')]: {
      width: '30%',
    },
  },
  checkoutNumberDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    [breakpoints.down('sm')]: {
      paddingBottom: '20px',
    },
  },
  checkoutBtn: {
    height: '40px',
  },
  deleteBtn: {
    width: '100px',
    backgroundColor: palette.error.main,
    color: palette.error.contrastText,
    '&:hover': {
      backgroundColor: palette.error.dark,
    },
  },
  checkoutDiv: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      justifyContent: 'end',
    },
  },
  cartDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    backgroundColor: palette.grey[200],
    margin: '30px',
    padding: '30px',
    borderRadius: '5px',
    color: palette.primary.main,
  },
}));

const CartPage = () => {
  const { cart, deleteCart, mutate } = useCartContext();
  const notify = () => toast.error('Cart Cleared!');

  const deeletAllCart = () => {
    deleteCart();
    notify();
    mutate(
      (data) => {
        if (data) {
          return {
            ...data,
            numOfCartItems: 0,
            data: { ...data.data, products: [], totalCartPrice: 0 },
          };
        }
      },
      { revalidate: false }
    );
  };

  const { classes } = useStyles();

  if (!cart?.data.products.length || !cart) {
    return <div className={classes.empty}>Your Cart is empty</div>;
  }

  const { numOfCartItems } = cart;
  const { products, totalCartPrice } = cart.data;

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Your Cart</Typography>
      <div className={classes.checkoutNumberDiv}>
        <div className={classes.cartDetails}>
          <Typography className={classes.subtitle} variant="h6">
            Total Price:<span>{totalCartPrice}</span> EGP
          </Typography>
          <Typography className={classes.subtitle} variant="h6">
            Number of Items: <span>{numOfCartItems}</span> items
          </Typography>
        </div>
        <div className={classes.checkoutDiv}>
          <Link to="/checkout">
            <Button className={classes.checkoutBtn}>Checkout</Button>
          </Link>
        </div>
      </div>

      <div className={classes.productsContainer}>
        {products.map((product) => (
          <CartProduct product={product} />
        ))}
      </div>
      <Button
        className={classes.deleteCart}
        variant="contained"
        onClick={() => deeletAllCart()}
      >
        Clear All Cart
      </Button>
      <Helmet>
        <title>Cart</title>
      </Helmet>
    </div>
  );
};

export default CartPage;
