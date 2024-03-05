import { Alert, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import makeStyles from '../../makeStyles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useUserContext } from '../../Context/UserContext';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';
const cookies = new Cookies();

const useStyle = makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // height: '100vh',
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
  newPassword: string;
};
const ResetPassword = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserToken } = useUserContext();

  const initialValues: User = {
    email: '',
    newPassword: '',
  };
  const verifyEmail = async (values: User) => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values
      );
      const data = response.data;

      if (data.token) {
        setIsLoading(false);
        setUserToken(data.token);
        localStorage.setItem('userToken', data.token);
        cookies.set('token', data.token);
        navigate('/');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    newPassword: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
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
      <Typography className={classes.title}>Reseat Your Password</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email-input"
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
        <TextField
          id="newPassword-input"
          label="newPassword"
          type="password"
          name="newPassword"
          autoComplete="current-newPassword"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <Alert severity="error">
            Password must be Minimum eight characters, at least one uppercase
            letter, one lowercase letter, one number and one special character
          </Alert>
        )}
        <Button className={classes.btn} type="submit" variant="outlined">
          Reset
        </Button>
      </form>
      <Helmet>
        <title>ResetPassword</title>
      </Helmet>
    </div>
  );
};

export default ResetPassword;
