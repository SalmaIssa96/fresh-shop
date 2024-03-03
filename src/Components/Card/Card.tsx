import { Typography } from '@mui/material';
import { CategoryType, SubCategoryResponseType } from '../../types';
import makeStyles from '../../makeStyles';
import BrandModal from '../BrandModal/BrandModal';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    width: '300px',
    height: '300px',
    margin: '10px',
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
      transform: 'scale(1.05)',
    },
  },

  categoryName: {
    borderTop: '1px solid #F6B17A',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2D3250',
    padding: spacing(4),
  },
}));

type Props = {
  item: CategoryType;
  type: string;
};
const Card = ({ item, type }: Props) => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data } = useFetchData<SubCategoryResponseType>(
    `https://ecommerce.routemisr.com/api/v1/categories/${item._id}/subcategories`
  );

  let subCategories = data?.data;

  return (
    <>
      <div onClick={handleOpen} className={classes.card}>
        <img src={item.image} alt={item.name} />
        <Typography variant="h5" className={classes.categoryName}>
          {item.name}
        </Typography>
      </div>

      <BrandModal
        type={type}
        open={open}
        handleClose={handleClose}
        item={item}
        subCategories={subCategories}
      />
    </>
  );
};

export default Card;
