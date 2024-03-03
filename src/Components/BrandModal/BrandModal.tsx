import Typography from '@mui/material/Typography';
import { CategoryType, SubCategoryType } from '../../types';
import makeStyles from '../../makeStyles';
import { Button, Dialog } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  open: boolean;
  handleClose: () => void;
  item: CategoryType;
  type: string;
  subCategories: SubCategoryType[] | undefined;
};

const useStyles = makeStyles(({ palette, spacing }) => ({
  modalContent: {
    padding: spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  closeBtnDiv: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
  closeBtn: {
    cursor: 'pointer',
    fontSize: '30px',
    color: palette.primary.main,
  },
  categoryName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
    color: palette.primary.main,
    padding: spacing(4),
    borderBottom: `1px solid ${palette.secondary.main}`,
  },
  subCategoryDiv: {
    display: 'flex',
    gap: '20px',
    padding: spacing(6),
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCategoryBtn: {
    color: palette.primary.main,
    fontSize: '20px',
  },
}));

const BrandModal = ({
  open,
  handleClose,
  item,
  type,
  subCategories,
}: Props) => {
  const { classes } = useStyles();

  if (type === 'category') {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modalContent}>
          <div className={classes.closeBtnDiv}>
            <ClearIcon onClick={handleClose} className={classes.closeBtn} />
          </div>
          <Typography id="modal-modal-title" className={classes.categoryName}>
            {item.name}
          </Typography>
          <div className={classes.subCategoryDiv}>
            {subCategories?.map((subCategory) => {
              return (
                <Button
                  className={classes.subCategoryBtn}
                  variant="outlined"
                  key={subCategory._id}
                >
                  {subCategory.name}
                </Button>
              );
            })}
            {subCategories?.length === 0 && (
              <Typography variant="h5">No Sub Categories</Typography>
            )}
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.modalContent}>
        <div className={classes.closeBtnDiv}>
          <ClearIcon onClick={handleClose} className={classes.closeBtn} />
        </div>
        <Typography id="modal-modal-title" className={classes.categoryName}>
          {item.name}
        </Typography>

        <img src={item.image} alt={item.name} />
      </div>
    </Dialog>
  );
};

export default BrandModal;
