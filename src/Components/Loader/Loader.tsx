import { RevolvingDot } from 'react-loader-spinner';
import makeStyles from '../../makeStyles';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    width: '100wh',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Loader = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <RevolvingDot
        visible={true}
        height="200"
        width="200"
        color="#2D3250"
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
