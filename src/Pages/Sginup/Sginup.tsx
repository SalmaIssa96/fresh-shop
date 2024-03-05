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
import { Helmet } from 'react-helmet';

type User = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

const useStyle = makeStyles(({ palette, breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexDirection: 'column',
    padding: '20px',
  },
  title: {
    color: palette.primary.main,
    fontWeight: 'bold',
    fontSize: '40px',
    alignSelf: 'flex-start',
    padding: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    background: palette.primary.main,
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-end',
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
  },
  arrowIcon: {
    fontSize: '25px',
    padding: '5px',
  },
}));

const Sginup = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialValues: User = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('required').min(3),
    email: Yup.string().required().email(),
    phone: Yup.string()
      .required()
      .matches(/^(01)[0-2]{1}[0-9]{8}$/),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')]),
  });
  const sginupFetch = async (values: User) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      const data = response.data;
      if (data.message === 'success') {
        setIsLoading(false);
        navigate('/login');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };

  const { userToken } = useUserContext();
  const token = localStorage.getItem('userToken');

  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: sginupFetch,
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
          label="name"
          name="name"
          type="text"
          autoComplete="current-name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <Alert severity="error">{formik.errors.name}</Alert>
        )}
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
        <TextField
          id="sginup-repassword-input"
          label="rePassword"
          type="password"
          name="rePassword"
          autoComplete="current-repassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <Alert severity="error">
            rePassword must be the same as password
          </Alert>
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

        <Button
          disabled={!formik.isValid}
          type="submit"
          variant="contained"
          className={classes.button}
        >
          {isLoading ? <InfinitySpin width="50" color="#4fa94d" /> : 'Register'}
        </Button>
      </form>
      <div className={classes.sginupLink}>
        <Typography className={classes.span}> Already registered ?</Typography>
        <Link to="/login">
          <Button className={classes.link} variant="text">
            Login!
            <ArrowOutwardIcon className={classes.arrowIcon} />
          </Button>
        </Link>
      </div>
      <Helmet>
        <title>Sginup</title>
      </Helmet>
    </div>
  );
};

export default Sginup;
