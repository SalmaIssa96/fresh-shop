import { Button, Typography } from '@mui/material';
import { useCartContext } from '../../Context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '../../makeStyles';
import { CartProductType } from '../../types';
import { toast } from 'react-toastify';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  productRow: {
    display: 'flex',
    gap: '20px',
    borderBottom: `1px solid ${palette.grey[400]}`,
    borderTop: `1px solid ${palette.grey[400]}`,
    padding: spacing(2),
    '& img': {
      width: '200px',
      height: '200px',
      objectFit: 'contain',
      borderRadius: '10px',
      [breakpoints.down('sm')]: {
        width: '150px',
        height: '150px',
      },
    },
    [breakpoints.down('sm')]: {
      gap: '10px',
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
  title: {
    fontSize: '20px',
    color: palette.primary.main,
    fontWeight: 'bold',
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    flex: '1',
    [breakpoints.down('sm')]: {
      gap: '5px',
    },
  },
  counterSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  countBtn: {
    padding: '5px',
    height: '30px',
    minWidth: '30px',
    [breakpoints.down('sm')]: {
      padding: '5px',
      minWidth: '20px',
      height: '20px',
    },
  },

  deleteCounterDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'start',
      width: '100%',
      gap: '10px',
    },
  },
  deleteBtn: {
    width: '100px',
    backgroundColor: palette.error.main,
    color: palette.error.contrastText,
    '&:hover': {
      backgroundColor: palette.error.dark,
    },
    [breakpoints.down('sm')]: {
      fontSize: '12px',
      width: '100%',
    },
  },
  icon: {
    fontSize: '20px',
  },
}));

type Props = {
  product: CartProductType;
};

const CartProduct = ({ product }: Props) => {
  const { deleteProduct, mutate, updateProductCount } = useCartContext();
  const notify = () => toast.error('Product removed from cart!');

  const deleteProductCart = (product: CartProductType) => {
    deleteProduct(product.product.id);
    notify();
    mutate(
      (prev) => {
        if (prev) {
          return {
            ...prev,
            numOfCartItems: prev.numOfCartItems - 1,

            data: {
              ...prev.data,
              totalCartPrice:
                prev.data.totalCartPrice - product.price * product.count,
              products: prev?.data.products.filter(
                (p) => p.product.id !== product.product.id
              ),
            },
          };
        } else {
          return prev;
        }
      },
      { revalidate: false }
    );
  };

  const updateProductCountCart = (product: CartProductType, action: string) => {
    if (action === 'increment') {
      updateProductCount(product.product.id, product.count + 1);
    } else {
      updateProductCount(product.product.id, product.count - 1);
    }
    if (product.count === 1 && action === 'decrement') {
      deleteProductCart(product);
      return;
    }
    mutate(
      (prev) => {
        if (prev) {
          return {
            ...prev,
            data: {
              ...prev.data,
              totalCartPrice:
                action === 'increment'
                  ? prev.data.totalCartPrice + product.price
                  : prev.data.totalCartPrice - product.price,
              products: prev?.data.products.map((p) => {
                if (p.product.id === product.product.id) {
                  return {
                    ...p,
                    count: action === 'increment' ? p.count + 1 : p.count - 1,
                  };
                } else {
                  return p;
                }
              }),
            },
          };
        } else {
          return prev;
        }
      },
      { revalidate: false }
    );
  };

  const { classes } = useStyles();

  if (!product.product) {
    return null;
  }

  return (
    <div key={product._id} className={classes.productRow}>
      <img src={product.product.imageCover} alt={product.product.title} />
      <div className={classes.productDetails}>
        <Typography className={classes.title}>
          {product.product.title}
        </Typography>
        <Typography>{product.price} EGP</Typography>
        <div className={classes.deleteCounterDiv}>
          <div className={classes.counterSection}>
            <Button
              className={classes.countBtn}
              variant="outlined"
              onClick={() => {
                updateProductCountCart(product, 'increment');
              }}
              disabled={product.count >= product.product.quantity}
            >
              +
            </Button>
            <Typography> {product.count}</Typography>
            <Button
              variant="outlined"
              color="error"
              className={classes.countBtn}
              onClick={() => {
                updateProductCountCart(product, 'decrement');
              }}
            >
              -
            </Button>
          </div>
          <div>
            <Button
              variant="text"
              onClick={() => {
                deleteProductCart(product);
              }}
              className={classes.deleteBtn}
            >
              <DeleteIcon className={classes.icon} /> Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
