import makeStyles from '../../makeStyles';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { ProductType, ProductsResponseType } from '../../types';
import Loader from '../Loader/Loader';
import { useWishListData } from '../../Context/hooks';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '30px',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const ProudctsSection = () => {
  const { classes } = useStyles();
  const { data, isLoading, error } = useFetchData<ProductsResponseType>(
    'https://ecommerce.routemisr.com/api/v1/products'
  );
  const { data: wishListData, mutate } = useWishListData();
  const wishListArr = wishListData?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return null;
  }

  const { data: products } = data;
  return (
    <div className={classes.root}>
      {products &&
        products.map((product: ProductType) => (
          <Link className={classes.link} to={`/products/${product.id}`}>
            <ProductCard
              inWishList={!!wishListArr?.find((item) => item.id === product.id)}
              product={product}
              key={product.id}
              mutateWishList={mutate}
            />
          </Link>
        ))}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default ProudctsSection;
