import { CategorySection } from '../../Components/CategorySection/CategorySection';
import HeroSecition from '../../Components/HeroSection/HeroSecition';
import ProudctsSection from '../../Components/ProudctsSection/ProudctsSection';
import makeStyles from '../../makeStyles';
import './style.css';

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
    [breakpoints.down('sm')]: {},
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: spacing(2),
    marginTop: '50px',
  },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        <HeroSecition />
      </div>
      <CategorySection />
      <div className={classes.content}>
        <ProudctsSection />
      </div>
    </div>
  );
};

export default Home;
