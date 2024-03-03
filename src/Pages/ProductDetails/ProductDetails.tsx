import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { ProductDetailsResponseType } from '../../types';
import { Button, Typography } from '@mui/material';
import makeStyles from '../../makeStyles';
import Slider, { Settings } from 'react-slick';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useCartContext } from '../../Context/CartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  useAddToWishList,
  useDeleteFromWishList,
  useWishListData,
} from '../../Context/hooks';
import Loader from '../../Components/Loader/Loader';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    display: 'flex',
    minHeight: '0',
    minWidth: 0,
    padding: spacing(9),
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      padding: spacing(3),
    },
  },
  productImagesSlider: {
    width: '500px',
    [breakpoints.down('sm')]: {
      width: '300px',
      padding: 0,
      margin: 0,
    },
  },
  image: {
    width: '100%',
    height: '550px',
    objectFit: 'contain',
    [breakpoints.down('sm')]: {
      height: '300px',
    },
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    width: '800px',
    [breakpoints.down('sm')]: {
      width: '100%',
      padding: spacing(3),
    },
  },
  productName: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  priceRatingDiv: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },
  starIcon: {
    color: palette.secondary.main,
    fontSize: 'medium',
  },
  productCategory: {
    color: '#F6B17A',
    fontSize: '14px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  cartIcon: {
    fontSize: 'medium',
    padding: spacing(0, 1),
  },
  cartBtn: {
    alignSelf: 'flex-end',
    padding: spacing(3),
    marginTop: spacing(3),
    [breakpoints.down('sm')]: {
      width: '100%',
      padding: spacing(2),
    },
  },
  heartRed: {
    fontSize: '25px',
    padding: spacing(0, 1),
    color: 'red',
  },
  heart: {
    fontSize: '25px',
    padding: spacing(0, 1),
  },
  titleHeartDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData<ProductDetailsResponseType>(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const { addToCart, mutate } = useCartContext();

  const { classes } = useStyles();
  const addToWhishlist = useAddToWishList();
  const deleteFromWishList = useDeleteFromWishList();
  const { data: wishListData, mutate: mutateWishList } = useWishListData();
  const notifyWishList = () => toast.success('Item added to wishlist!');
  const notifyWishListDelete = () => toast.error('Item deleted to wishlist!');

  const isWishList = wishListData?.data.find((item) => item.id === id);
  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return null;
  }

  const { data: product } = data;

  return (
    <div className={classes.root}>
      <div className={classes.productImagesSlider}>
        <Slider {...settings}>
          {product.images.map((image: string) => (
            <img
              key={image}
              className={classes.image}
              src={image}
              alt={product.title}
            />
          ))}
        </Slider>
      </div>
      <div className={classes.productDetails}>
        <div className={classes.titleHeartDiv}>
          <div>
            <Typography className={classes.productName}>
              {product.title}
            </Typography>
            <Typography>{product.description}</Typography>
          </div>
          <Button
            variant="text"
            onClick={async (e) => {
              e.preventDefault();
              if (!isWishList) {
                await addToWhishlist(product.id);
                mutateWishList();
                notifyWishList();
              } else {
                await deleteFromWishList(product.id);
                mutateWishList();
                notifyWishListDelete();
              }
            }}
          >
            <FavoriteIcon
              className={isWishList ? classes.heartRed : classes.heart}
            />
          </Button>
        </div>
        <div>
          <Typography className={classes.productCategory}>
            {product.category.name}
          </Typography>
          <div className={classes.priceRatingDiv}>
            <Typography>{`${product.price} EGP`}</Typography>
            <div className={classes.rating}>
              <StarIcon className={classes.starIcon} />
              <Typography>{product.ratingsAverage}</Typography>
            </div>
          </div>
        </div>
        <Button
          className={classes.cartBtn}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id);
            mutate();
          }}
          variant="contained"
        >
          <AddShoppingCartIcon className={classes.cartIcon} />
          Add to Cart
        </Button>
      </div>
      <Helmet>
        <title> Product Details </title>
      </Helmet>
    </div>
  );
};

export default ProductDetails;
