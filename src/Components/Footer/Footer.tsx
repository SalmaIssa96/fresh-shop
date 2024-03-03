import { Button, TextField, Typography } from '@mui/material';
import makeStyles from '../../makeStyles';
import amazonPay from '../../assets/Amazon_Pay_logo.svg.png';
import masterCard from '../../assets/MasterCard_Logo.svg.png';
import payPal from '../../assets/PayPal-Logo.png';
import americanExpress from '../../assets/American-Express-creditcard-aanvragen-Logo.png';
import applePay from '../../assets/apple.png';
import google from '../../assets/get-it-on-google-play-png-1.png';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    width: '100%',
    background: palette.grey[200],
    marginTop: '50px',
  },
  title: {
    fontSize: '30px',
    color: palette.primary.main,
    fontWeight: 'bold',
    [breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    [breakpoints.down('sm')]: {
      padding: '10px',
      gap: '5px',
    },
  },
  shareEmailDiv: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '10px',
    },
  },
  paymentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    width: '70%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  imagesIconDIV: {
    display: 'flex',
    gap: '10px',
  },
  imageIcon: {
    height: '20px',
  },
  appsImage: {
    height: '30px',
  },
  footerdetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${palette.grey[400]}`,
    borderBottom: `1px solid ${palette.grey[400]}`,
    padding: spacing(2),
    [breakpoints.down('sm')]: {
      padding: spacing(1),
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '10px',
    },
  },
  appsSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '10px',
    },
  },
}));
const Footer = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.footerContent}>
        <Typography className={classes.title}>Create FreshCart App </Typography>
        <Typography>
          We will send you a link , open it on your phone to download the app
        </Typography>
        <div className={classes.shareEmailDiv}>
          <TextField
            className={classes.input}
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
          />
          <Button variant="contained">Share App Link </Button>
        </div>
        <div className={classes.footerdetails}>
          <div className={classes.paymentSection}>
            <Typography>Partner Payment</Typography>
            <div className={classes.imagesIconDIV}>
              <img
                className={classes.imageIcon}
                src={amazonPay}
                alt="amazonPay"
              />
              <img
                className={classes.imageIcon}
                src={masterCard}
                alt="masterCard"
              />
              <img className={classes.imageIcon} src={payPal} alt="payPal" />
              <img
                className={classes.imageIcon}
                src={americanExpress}
                alt="americanExpress"
              />
            </div>
          </div>
          <div className={classes.appsSection}>
            <Typography>Get deliveries with FreshCart</Typography>
            <div className={classes.imagesIconDIV}>
              <img
                className={classes.appsImage}
                src={applePay}
                alt="applePay"
              />
              <img className={classes.appsImage} src={google} alt="google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
