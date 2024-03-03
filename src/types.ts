export type CategoryType = {
  name: string;
  image: string;
  _id: string;
};

export type ProductType = {
  category: CategoryType;
  description: string;
  imageCover: string;
  ratingsAverage: number;
  title: string;
  id: string;
  price: number;
  images: string[];
  quantity: number;
};

export type CartProductType = {
  count: number;
  price: number;
  _id: string;
  product: ProductType;
};

export type CartDataResponse = {
  _id: string;
  products: CartProductType[];
  totalCartPrice: number;
};
export type CartResponse = {
  numOfCartItems: number;
  data: CartDataResponse;
  status: string;
};
export type SubCategoryType = {
  name: string;
  _id: string;
};
export type ProductsResponseType = {
  data: ProductType[];

  metadata: any;
  results: number;
};

export type SubCategoryResponseType = {
  data: SubCategoryType[];
  metadata: any;
  results: number;
};

export type CategoryResponseType = {
  data: CategoryType[];
  metadata: any;
  results: number;
};

export type ProductDetailsResponseType = {
  data: ProductType;
};

export type ShippingAddressType = {
  details: string;
  city: string;
  phone: string;
};
