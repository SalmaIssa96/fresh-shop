import { ReactNode, useContext } from 'react';
import { createContext } from 'react';
import useFetchData from '../hooks/useFetchData';
import {
  useAddToCart,
  useDeleteCart,
  useDeleteProduct,
  useUpdateProductCount,
} from './hooks';
import { CartResponse } from '../types';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';

type ContextType = {
  cart: CartResponse;
  addToCart: (productId: string) => Promise<AxiosResponse<any, any>>;
  deleteProduct: (productId: string) => Promise<AxiosResponse<any, any>>;
  updateProductCount: (
    productId: string,
    count: number
  ) => Promise<AxiosResponse<any, any>>;
  deleteCart: () => Promise<AxiosResponse<any, any>>;
  mutate: KeyedMutator<CartResponse>;
};

export const CartContext = createContext(null as any as ContextType);

type Props = {
  children: ReactNode;
};
const CartcontextProvider = (props: Props) => {
  const addToCart = useAddToCart();
  const deleteProduct = useDeleteProduct();
  const updateProductCount = useUpdateProductCount();
  const deleteCart = useDeleteCart();
  const { data, mutate, isLoading } = useFetchData<CartResponse>(
    'https://ecommerce.routemisr.com/api/v1/cart'
  );

  if (isLoading) {
    return null;
  }

  const initialData = data ?? {
    numOfCartItems: 0,
    status: '',
    data: {
      products: [],
      totalCartPrice: 0,
      _id: '',
    },
  };

  return (
    <CartContext.Provider
      value={{
        cart: initialData,
        addToCart,
        deleteProduct,
        mutate,
        updateProductCount,
        deleteCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartcontextProvider;
