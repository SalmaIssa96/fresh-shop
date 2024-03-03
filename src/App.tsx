import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Sginup from './Pages/Sginup/Sginup';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import CategoriesPage from './Pages/CategoriesPage/CategoriesPage';
import BrandsPage from './Pages/BrandsPage/BrandsPage';
import CartPage from './Pages/CartPage/CartPage';
import CartcontextProvider from './Context/CartContext';
import './axiosConfig';
import WhishList from './Pages/WhishList/WhishList';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerifyCode from './Pages/VerifyCode/VerifyCode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Checkout from './Pages/Checkout/Checkout';
import AllOrder from './Pages/AllOrder/AllOrder';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'signup',
        element: <Sginup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'products/:id',
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'brands',
        element: (
          <ProtectedRoute>
            <BrandsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'whishlist',
        element: (
          <ProtectedRoute>
            <WhishList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'allorders',
        element: (
          <ProtectedRoute>
            <AllOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />,
      },
      {
        path: 'verify-code',
        element: <VerifyCode />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: `"Roboto",  sans-serif`,
    body1: {
      color: '#2D3250',
    },
  },
  spacing: 4,
  palette: {
    primary: {
      main: '#2D3250',
    },
    secondary: {
      main: '#F6B17A',
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <UserContextProvider>
      <CartcontextProvider>
        <ThemeProvider theme={theme}>
          <HelmetProvider>
            <RouterProvider router={routers} />
          </HelmetProvider>
        </ThemeProvider>
      </CartcontextProvider>
    </UserContextProvider>
  );
}

export default App;
