import { Typography } from '@mui/material';
import makeStyles from '../../makeStyles';
import Slider, { Settings } from 'react-slick';
import useFetchData from '../../hooks/useFetchData';
import { CategoryResponseType, CategoryType } from '../../types';
import Loader from '../Loader/Loader';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    marginTop: '20px',
    padding: spacing(2),
  },
  categorySlider: {
    marginTop: '15px',
    [breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  title: {
    color: palette.primary.main,
    fontSize: '30px',
    fontWeight: '500',

    [breakpoints.down('sm')]: { fontSize: '20px', textAlign: 'center' },
  },
  image: {
    width: '200px',
    height: '200px',
    borderRadius: '5px',
    objectFit: 'cover',
    [breakpoints.down('sm')]: { width: '100px', height: '100px' },
  },
  categoryName: {
    color: palette.primary.main,
    fontWeight: '500',
    marginTop: '10px',
    textAlign: 'center',
  },
}));

export const CategorySection = () => {
  const { data, isLoading, error } = useFetchData<CategoryResponseType>(
    'https://ecommerce.routemisr.com/api/v1/categories'
  );
  const { classes } = useStyles();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return null;
  }
  const { data: categories } = data;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Shop Popular Category{' '}
      </Typography>
      <div className={classes.categorySlider}>
        <Slider {...settings}>
          {categories.map((item: CategoryType) => (
            <div key={item._id} className={classes.root}>
              <img src={item.image} alt={item.name} className={classes.image} />
              <Typography className={classes.categoryName}>
                {item.name}
              </Typography>
            </div>
          ))}
          {error && <h1>{error}</h1>}
        </Slider>
      </div>
    </div>
  );
};
