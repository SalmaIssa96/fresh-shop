import { Helmet } from 'react-helmet';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import useFetchData from '../../hooks/useFetchData';
import makeStyles from '../../makeStyles';
import { CategoryResponseType, CategoryType } from '../../types';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: spacing(9),
  },
  btnCard: {
    cursor: 'pointer',
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
  },
}));

const BrandsPage = () => {
  const { classes } = useStyles();

  const { data, isLoading, error } = useFetchData<CategoryResponseType>(
    'https://ecommerce.routemisr.com/api/v1/brands'
  );

  if (error) {
    return <div className={classes.empty}>Something went wrong</div>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data || error) {
    return null;
  }
  const { data: brands } = data;

  return (
    <div className={classes.root}>
      {brands.map((item: CategoryType) => (
        <div className={classes.btnCard} key={item._id}>
          <Card type="brand" item={item} />
        </div>
      ))}
      <Helmet>
        <title>Brands</title>
      </Helmet>
    </div>
  );
};

export default BrandsPage;
