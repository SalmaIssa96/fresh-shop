import { Typography } from '@mui/material';
import useFetchData from '../../hooks/useFetchData';
import WishListCard from '../../Components/WishListCard/WishListCard';
import { ProductsResponseType } from '../../types';
import makeStyles from '../../makeStyles';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet-async';

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
      gap: '10px',
      backgroundColor: 'transparent',
      marginTop: '0',
    },
  },
  title: {
    marginBottom: spacing(4),
    fontWeight: 'bold',
    color: palette.primary.main,
    fontSize: '40px',
    [breakpoints.down('sm')]: {
      fontSize: '30px',
      marginBottom: spacing(2),
    },
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

const WhishList = () => {
  const { classes } = useStyles();
  const { data, isLoading } = useFetchData<ProductsResponseType>(
    'https://ecommerce.routemisr.com/api/v1/wishlist'
  );

  const { data: wishListData } = data || {};
  if (!wishListData?.length || !wishListData)
    return <div className={classes.empty}>NO WishList</div>;
  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.title}>My Whish List</Typography>
        {isLoading && <Loader />}
        {wishListData &&
          wishListData.map((item: any) => {
            return <WishListCard product={item} key={item.id} />;
          })}
      </div>
      <Helmet>
        <title>WishList</title>
      </Helmet>
    </>
  );
};

export default WhishList;
