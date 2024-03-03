import { Alert, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import makeStyles from '../../makeStyles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';

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

type Code = {
  resetCode: string;
};
const VerifyCode = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues: Code = {
    resetCode: '',
  };
  const verifyCode = async (values: Code) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        values
      );
      const data = response.data;

      console.log(data, 'kjdkdjskd  ');

      if (data.status === 'Success') {
        setIsLoading(false);
        navigate('/reset-password');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  };

  let formik = useFormik({
    initialValues,
    onSubmit: verifyCode,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={classes.root}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography className={classes.title}>Reset your password</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="code-input"
          label="resetCode"
          name="resetCode"
          type="text"
          autoComplete="current-code"
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          onBlur={formik.handleBlur}
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <Alert severity="error">{formik.errors.resetCode}</Alert>
        )}
        <Button className={classes.btn} type="submit" variant="outlined">
          Verify
        </Button>
      </form>
      <Helmet>
        <title>VerifyCode</title>
      </Helmet>
    </div>
  );
};

export default VerifyCode;
