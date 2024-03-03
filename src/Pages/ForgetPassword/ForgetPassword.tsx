import { Alert, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import makeStyles from '../../makeStyles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

const useStyle = makeStyles(({ palette, spacing, breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: spacing(6),
    padding: spacing(8),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    width: '100%',
  },
  title: {
    color: palette.primary.main,
    fontWeight: 'bold',
    fontSize: '30px',
    [breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  btn: {
    width: '100px',
    color: palette.secondary.dark,
    borderColor: palette.secondary.dark,
    fontWeight: 'bold',
  },
}));

type User = {
  email: string;
};
const ForgetPassword = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues: User = {
    email: '',
  };
  const verifyEmail = async (values: User) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );
      const data = response.data;

      console.log(data);

      if (data.statusMsg === 'success') {
        setIsLoading(false);
        navigate('/verify-code');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
  });
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: verifyEmail,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={classes.root}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography className={classes.title}>
        Please enter your email to reset your Password
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="sginup-email-input"
          label="Email"
          name="email"
          type="email"
          autoComplete="current-email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <Alert severity="error">{formik.errors.email}</Alert>
        )}
        <Button className={classes.btn} type="submit" variant="outlined">
          Verify
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
