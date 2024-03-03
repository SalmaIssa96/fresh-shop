import { Helmet } from 'react-helmet';
import { CategorySection } from '../../Components/CategorySection/CategorySection';
import HeroSection from '../../Components/HeroSection/HeroSection';
import ProudctsSection from '../../Components/ProudctsSection/ProudctsSection';
import makeStyles from '../../makeStyles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: '0 auto',
  },
  slider: {
    display: 'flex',
    minHeight: 0,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: spacing(2),
    marginTop: '50px',
    [breakpoints.down('sm')]: {
      padding: spacing(8),
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        <HeroSection />
      </div>
      <CategorySection />
      <div className={classes.content}>
        <ProudctsSection />
      </div>
      <Helmet>
        <title>Home</title>
      </Helmet>
    </div>
  );
};

export default Home;
