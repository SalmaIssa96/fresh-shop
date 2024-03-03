import { Alert, Button, TextField, Typography } from '@mui/material';
import makeStyles from '../../makeStyles';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { useUserContext } from '../../Context/UserContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

type User = {
  email: string;
  password: string;
};

const useStyle = makeStyles(({ palette, spacing, breakpoints }) => ({
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
    [breakpoints.down('sm')]: {
      fontSize: '30px',
    },
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
    [breakpoints.down('sm')]: {
      alignSelf: 'center',
    },
  },
  span: {
    color: palette.secondary.dark,
    fontSize: '20px',
    [breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  link: {
    cursor: 'pointer',
    fontSize: '16px',
  },
  arrowIcon: {
    fontSize: '25px',
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

const Login = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserToken, userToken } = useUserContext();

  const token = localStorage.getItem('userToken');

  const initialValues: User = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),

    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  });
  const loginFetch = async (values: User) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      );
      const data = response.data;
      if (data.message === 'success') {
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

  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: loginFetch,
  });

  if (userToken || token) {
    return <Navigate to="/" />;
  }
  return (
    <div className={classes.root}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography className={classes.title}>Register Now :</Typography>
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
        <TextField
          id="sginup-password-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password && (
          <Alert severity="error">
            Password must be Minimum eight characters, at least one uppercase
            letter, one lowercase letter, one number and one special character
          </Alert>
        )}

        <div className={classes.btnSection}>
          <Link to={'/forget-password'}>
            <Button variant="outlined" className={classes.link}>
              Forget Password ?
            </Button>
          </Link>
          <Button disabled={!formik.isValid} type="submit" variant="contained">
            {isLoading ? <InfinitySpin width="50" color="#4fa94d" /> : 'Login'}
          </Button>
        </div>
      </form>
      <div className={classes.sginupLink}>
        <Typography className={classes.span}> Not registered yet?</Typography>
        <Link to="/signup">
          <Button className={classes.link} variant="text">
            Creat an account
            <ArrowOutwardIcon className={classes.arrowIcon} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
