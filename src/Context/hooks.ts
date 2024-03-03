import axios from 'axios';
import { ProductsResponseType, ShippingAddressType } from '../types';
import useFetchData from '../hooks/useFetchData';

export const useAddToCart = () => {
  return (productId: string) => {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId,
    });
  };
};

export const useDeleteProduct = () => {
  return (productId: string) => {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
  };
};
export const useDeleteCart = () => {
  return () => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`);
  };
};

export const useUpdateProductCount = () => {
  return (productId: string, count: number) => {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      }
    );
  };
};

export const useAddToWishList = () => {
  return (productId: string) => {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId,
    });
  };
};

export const useDeleteFromWishList = () => {
  return (productId: string) => {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
    );
  };
};

type CheckoutResponseType = {
  status: string;
  session: {
    url: string;
  };
};
export const useCheckout = () => {
  return async (cartId: string, shippingAddress: ShippingAddressType) => {
    const { data } = await axios.post<CheckoutResponseType>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=§${window.location.origin}`,
      {
        shippingAddress,
      }
    );
    return data;
  };
};

export const useWishListData = () => {
  const { data, error, isLoading, mutate } = useFetchData<ProductsResponseType>(
    'https://ecommerce.routemisr.com/api/v1/wishlist'
  );
  return { data, error, isLoading, mutate };
};
