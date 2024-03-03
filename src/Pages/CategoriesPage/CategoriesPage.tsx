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

const CategoriesPage = () => {
  const { classes } = useStyles();
  const { data, isLoading, error } = useFetchData<CategoryResponseType>(
    'https://ecommerce.routemisr.com/api/v1/categories'
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
  const { data: categories } = data;

  return (
    <div className={classes.root}>
      {categories.map((item: CategoryType) => (
        <div className={classes.btnCard} key={item._id}>
          <Card type="category" item={item} />
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
