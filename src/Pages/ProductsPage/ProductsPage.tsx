import { TextField } from '@mui/material';
import ProductCard from '../../Components/ProductCard/ProductCard';
import useFetchData from '../../hooks/useFetchData';
import makeStyles from '../../makeStyles';
import { ProductsResponseType } from '../../types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import { useWishListData } from '../../Context/hooks';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '30px',
    width: '100%',
    marginTop: '30px',
  },
  link: {
    textDecoration: 'none',
    [breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  searchInput: {
    width: '100%',
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      width: '75%',
    },
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    width: '100%',
    justifyContent: 'center',
  },
}));

const ProductsPage = () => {
  const [searchProducts, setSearchProducts] = useState('');
  const { classes } = useStyles();
  const { data, isLoading, error } = useFetchData<ProductsResponseType>(
    'https://ecommerce.routemisr.com/api/v1/products'
  );
  const { data: wishListData, mutate } = useWishListData();

  const wishListArr = wishListData?.data ?? [];
  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return null;
  }

  const { data: products } = data;

  const searchProudcts = (search: string) => {
    if (search) {
      return products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return products;
  };
  const filteredProducts = searchProudcts(searchProducts);

  return (
    <div className={classes.root}>
      <div className={classes.searchInput}>
        <TextField
          fullWidth
          label="Search"
          id="SearchInput"
          onChange={(e) => {
            setSearchProducts(e.target.value);
          }}
        />
      </div>
      <div className={classes.productsContainer}>
        {filteredProducts &&
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              className={classes.link}
              to={`/products/${product.id}`}
            >
              <ProductCard
                product={product}
                inWishList={
                  !!wishListArr?.find((item) => item.id === product.id)
                }
                mutateWishList={mutate}
              />
            </Link>
          ))}
        {error && <h1>{error}</h1>}
      </div>
    </div>
  );
};

export default ProductsPage;
