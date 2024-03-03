import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import makeStyles from '../../makeStyles';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles({
  root: {
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    flex: 1,
  },
});

const Layout = () => {
  const { classes } = useStyles();
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar />
      <div className={classes.root}>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Layout;
