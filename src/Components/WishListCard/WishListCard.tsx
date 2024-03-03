import { Button, Typography } from '@mui/material';
import { ProductType } from '../../types';
import { useDeleteFromWishList, useWishListData } from '../../Context/hooks';
import { AxiosResponse } from 'axios';
import makeStyles from '../../makeStyles';
import { useCartContext } from '../../Context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: spacing(2),
    borderBottom: `1px solid ${palette.grey[400]}`,
    '& img': {
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    [breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
    },
  },

  productContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  btnSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '10px',
    },
  },

  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
}));

type ProductCardProps = {
  product: ProductType;
};

type DeleteFromWishListT = (
  productId: string
) => Promise<AxiosResponse<any, any>>;

const WishListCard = ({ product }: ProductCardProps) => {
  const { classes } = useStyles();
  const { addToCart, mutate } = useCartContext();
  const { mutate: mutateWishlist } = useWishListData();
  const deleteFromWishList: DeleteFromWishListT = useDeleteFromWishList();
  const notify = () => toast.error('Item deleted from wishlist!');
  const notifyCart = () => toast.success('Item added to cart!');

  return (
    <div className={classes.root}>
      <img src={product.imageCover} alt={product.title} />

      <div className={classes.productContent}>
        <Typography className={classes.productName}>{product.title}</Typography>
        <Typography>{`${product.price} EGP`}</Typography>
        <div className={classes.btnSection}>
          <Button
            color="error"
            onClick={async () => {
              await deleteFromWishList(product.id);
              mutateWishlist();
              notify();
            }}
          >
            <DeleteIcon />
            Remove
          </Button>
          <Button
            variant="outlined"
            onClick={async (e) => {
              e.preventDefault();
              await addToCart(product.id);
              mutate((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    numOfCartItems: prev.numOfCartItems + 1,
                  };
                } else {
                  return prev;
                }
              });
              notifyCart();
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
