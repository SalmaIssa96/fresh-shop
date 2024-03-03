import notFoundImage from '../../assets/004.jpg';
import makeStyles from '../../makeStyles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

const NotFoundPage = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.image} src={notFoundImage} alt="404 Not Found" />
    </div>
  );
};

export default NotFoundPage;
