import makeStyles from '../../makeStyles';
import { Button, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProductType, ProductsResponseType } from '../../types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartContext } from '../../Context/CartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAddToWishList, useDeleteFromWishList } from '../../Context/hooks';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    width: '250px',
    height: '400px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '& img': {
      width: '100%',
      height: '200px',
      objectFit: 'contain',
      borderRadius: '10px',
    },
    '&:hover': {
      boxShadow: '0 0 10px 0 rgba(246, 177, 122, 0.5)',
      cursor: 'pointer',
      transform: 'scale(1.08 )',
    },
    // [breakpoints.down('md')]: {
    //   width: '100%',
    // },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  productCategory: {
    color: '#F6B17A',
    fontSize: '14px',
  },
  productRatingSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  ratingsAverage: {
    fontSize: '14px',
  },

  productPrice: {
    fontSize: '14px',
  },
  starIcon: {
    color: palette.secondary.main,
    fontSize: 'medium',
  },
  cartIcon: {
    fontSize: 'medium',
    padding: spacing(0, 1),
  },
  heartRed: {
    padding: spacing(0, 1),
    color: 'red',
  },
  wishRateDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

type ProductCardProps = {
  product: ProductType;
  inWishList: boolean | undefined;
  mutateWishList: KeyedMutator<ProductsResponseType>;
};
type AddToWishListProps = (
  productId: string
) => Promise<AxiosResponse<any, any>>;

const ProductCard = ({
  product,
  inWishList,
  mutateWishList,
}: ProductCardProps) => {
  const { classes } = useStyles();
  const { addToCart, mutate } = useCartContext();
  const addToWhishlist: AddToWishListProps = useAddToWishList();
  const deleteFromWishList = useDeleteFromWishList();
  const notifyWishListDelete = () => toast.error('Item removed from wishlist!');
  const notifyCart = () => toast.success('Item added to cart!');
  const notifyWishList = () => toast.success('Item added to wishlist!');

  return (
    <div className={classes.productCard}>
      <img src={product.imageCover} alt={product.title} />
      <div>
        <div className={classes.wishRateDiv}>
          <div>
            <Typography className={classes.productCategory}>
              {product.category.name}
            </Typography>
            <Typography className={classes.productName}>
              {product.title.split(' ').slice(0, 3).join(' ')}
            </Typography>
          </div>
          <Button
            variant="text"
            onClick={async (e) => {
              e.preventDefault();
              if (!inWishList) {
                await addToWhishlist(product.id);
                notifyWishList();
                mutateWishList();
              } else {
                await deleteFromWishList(product.id);
                notifyWishListDelete();
                mutateWishList();
              }
            }}
          >
            <FavoriteIcon
              className={inWishList ? classes.heartRed : classes.cartIcon}
            />
          </Button>
        </div>
      </div>
      <div className={classes.wishRateDiv}>
        <Typography
          className={classes.productPrice}
        >{`${product.price} EGP`}</Typography>
        <div className={classes.rating}>
          <StarIcon className={classes.starIcon} />
          <Typography className={classes.ratingsAverage}>
            {product.ratingsAverage}
          </Typography>
        </div>
      </div>
      <Button
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
        variant="contained"
      >
        <AddShoppingCartIcon className={classes.cartIcon} />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
