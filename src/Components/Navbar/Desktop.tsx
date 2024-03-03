import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import makeStyles from '../../makeStyles';
import { useUserContext } from '../../Context/UserContext';
import { useCartContext } from '../../Context/CartContext';

const pages = [
  { key: '/', name: 'home' },
  { key: 'cart', name: 'cart' },
  { key: 'products', name: 'products' },
  { key: 'categories', name: 'categories' },
  { key: 'brands', name: 'brands' },
  { key: 'whishlist', name: 'whish list' },
];

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    background: palette.grey[200],
    color: palette.primary.main,
    boxShadow: 'none',
    minHeight: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  logoIcon: {
    color: palette.secondary.main,
    fontSize: '2rem',
    transform: 'rotateY(180deg)',
  },
  logoText: {
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontWeight: 400,
    color: palette.grey[600],
    textTransform: 'uppercase',
  },
  logoLinksWrapper: {
    display: 'flex',
    gap: spacing(15),
  },
  cartIconDiv: {
    position: 'relative',
  },
  cartNumber: {
    position: 'absolute',
    top: '-13px',
    right: '-8px',
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
    borderRadius: '50%',
    padding: '0 7px',
    fontSize: '12px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const logout = () => {
  localStorage.removeItem('userToken');
  window.location.reload();
};

function Desktop() {
  const { cart } = useCartContext();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { userToken } = useUserContext();

  if (!cart) return null;

  const { numOfCartItems } = cart;

  return (
    <AppBar className={classes.root} position="static">
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar} disableGutters>
          <div className={classes.logoLinksWrapper}>
            <Link to="/" className={classes.link}>
              <div className={classes.logo}>
                <ShoppingCartIcon className={classes.logoIcon} />
                <Typography className={classes.logoText} variant="h6">
                  Fresh Shop
                </Typography>
              </div>
            </Link>
            <div className={classes.link}>
              {pages.map(({ key, name }) => (
                <Button
                  onClick={() => navigate(key)}
                  className={classes.button}
                  key={key}
                  variant="text"
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
          <div className={classes.media}>
            {!userToken ? (
              <>
                <Link to="login">
                  <Button className={classes.button} variant="text">
                    Login
                  </Button>
                </Link>
                <Link to="signup">
                  <Button className={classes.button} variant="text">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className={classes.cartIconDiv}>
                  <Link to="cart" className={classes.link}>
                    <ShoppingCartIcon />
                    <Typography variant="h6" className={classes.cartNumber}>
                      {numOfCartItems}
                    </Typography>
                  </Link>
                </div>
                <Button
                  className={classes.button}
                  variant="text"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Desktop;
