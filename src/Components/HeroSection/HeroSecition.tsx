import Slider, { Settings } from 'react-slick';
import Image1 from '../../assets/slider-2.jpeg';
import Image2 from '../../assets/slider-image-1.jpeg';
import Image3 from '../../assets/slider-image-2.jpeg';
import Image4 from '../../assets/slider-image-3.jpeg';
import makeStyles from '../../makeStyles';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 0,
    minWidth: 0,
    margin: '46px 0',
    [breakpoints.down('sm')]: {
      margin: '20px 0',
    },
  },
  verticalImage: {
    width: '100%',
    objectFit: 'cover',
    height: '50%',
    objectPosition: 'right top',
  },
  sliderRoot: {
    width: '75%',
    height: '400px',
    [breakpoints.down('sm')]: {
      height: '300px',
    },
  },

  sliderImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      height: '300px',
    },
  },
  verticalImages: {
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const HeroSecition = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.sliderRoot}>
        <Slider {...settings}>
          <div>
            <img className={classes.sliderImage} src={Image3} alt="slider" />
          </div>
          <div>
            <img className={classes.sliderImage} src={Image4} alt="slider" />
          </div>
          <div>
            <img className={classes.sliderImage} src={Image2} alt="slider" />
          </div>
          <div>
            <img className={classes.sliderImage} src={Image1} alt="slider" />
          </div>
        </Slider>
      </div>
      <div className={classes.verticalImages}>
        <img className={classes.verticalImage} src={Image1} alt="slider" />
        <img className={classes.verticalImage} src={Image2} alt="slider" />
      </div>
    </div>
  );
};

export default HeroSecition;
