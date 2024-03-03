import { Alert, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import makeStyles from '../../makeStyles';
import { useCartContext } from '../../Context/CartContext';
import { useCheckout } from '../../Context/hooks';
import { ShippingAddressType } from '../../types';

const useStyle = makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexDirection: 'column',
    padding: '20px',
  },
  title: {
    color: palette.primary.main,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    padding: spacing(6),
  },

  sginupLink: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  span: {
    color: palette.secondary.dark,
    fontSize: '20px',
  },
  link: {
    cursor: 'pointer',
    fontSize: '16px',
  },
  arrowIcon: {
    fontSize: '16px',
    padding: '5px',
  },
  btnSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: spacing(4),
  },
}));

const Checkout = () => {
  const checkOut = useCheckout();

  const { classes } = useStyle();
  const {
    cart: {
      data: { _id: cartId },
    },
  } = useCartContext();

  const handleSubmit = async (values: ShippingAddressType) => {
    const result = await checkOut(cartId, values);
    if (result.status === 'success') {
      window.location.href = result.session.url;
    }
  };
  const initialValues: ShippingAddressType = {
    details: '',
    city: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    details: Yup.string(),
    city: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(/^(01)[0-2]{1}[0-9]{8}$/),
  });

  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={classes.root}>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      <Typography className={classes.title}>Register Now :</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="sginup-details-input"
          label="details"
          name="details"
          type="text"
          autoComplete="current-details"
          onChange={formik.handleChange}
          value={formik.values.details}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details && (
          <Alert severity="error">{formik.errors.details}</Alert>
        )}
        <TextField
          id="sginup-city-input"
          label="city"
          name="city"
          type="text"
          autoComplete="current-city"
          onChange={formik.handleChange}
          value={formik.values.city}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city && (
          <Alert severity="error">{formik.errors.city}</Alert>
        )}
        <TextField
          id="sginup-phone-input"
          label="Phone"
          type="tel"
          name="phone"
          autoComplete="current-number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone && (
          <Alert severity="error">
            Phone number must be Egyption number which start with 01
          </Alert>
        )}

        <div className={classes.btnSection}>
          <Button disabled={!formik.isValid} type="submit" variant="contained">
            Pay now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
