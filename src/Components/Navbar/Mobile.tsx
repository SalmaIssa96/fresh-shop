import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import { useUserContext } from '../../Context/UserContext';
import makeStyles from '../../makeStyles';
import './style.css';

const pages = [
  { key: '/', name: 'home' },
  { key: 'cart', name: 'cart' },
  { key: 'products', name: 'products' },
  { key: 'categories', name: 'categories' },
  { key: 'brands', name: 'brands' },
  { key: 'whishlist', name: 'whish list' },
];
const useStyles = makeStyles(({ palette }) => ({
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
  container: {
    display: 'flex',
    gap: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginShare: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoApp: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontWeight: 400,
    color: palette.grey[600],
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  logoIcon: {
    color: palette.secondary.main,
    fontSize: '20px',
    transform: 'rotateY(180deg)',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: '20px',
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

function Mobile() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const { userToken } = useUserContext();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const { classes } = useStyles();
  const { numOfCartItems } = cart;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    window.location.reload();
  };

  return (
    <AppBar className={classes.root} position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <div className={classes.container}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ key, name }) => (
                <MenuItem key={key} onClick={handleCloseNavMenu}>
                  <Button
                    onClick={() => navigate(key)}
                    className={classes.button}
                    key={key}
                    variant="text"
                  >
                    {name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div className={classes.logoApp}>
            <ShoppingCartIcon className={classes.logoIcon} />
            <Typography variant="h5" className={classes.logoText}>
              Fresh Shop
            </Typography>
          </div>
          <div className={classes.loginShare}>
            {userToken && (
              <div className={classes.cartIconDiv}>
                <Link to="cart" className={classes.link}>
                  <ShoppingCartIcon />
                  <Typography className={classes.cartNumber}>
                    {numOfCartItems}
                  </Typography>
                </Link>
              </div>
            )}
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
              <Button
                className={classes.button}
                variant="text"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Mobile;
