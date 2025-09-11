import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export type IProductType = string | 'apart' | 'house' | 'room' | 'commercial' | 'farm' | 'sitesFarm' | 'plot' | 'land' | 'garagesParking' | 'billboard'

export type IProduct = {
  type: IProductType;
  city: object | null;
  state: object | null;
  owner: string;
  addOn: string;
  title: string;
  price: string;
  address: string;
  zipCode: string;
  features: Record<IProductType, object>;
  locations: string[];
  negotiation: string;
  phoneNumber: string;
  hideAddress: boolean;
  neighborhood: object | null;
  rentalPeriod: string;
  contactMethod: string;
  privacyPolicy: boolean;
  rentalDuration: number;
  images?: string[] | File[] | CustomFile[] | (string | File | CustomFile)[];
  image?: string | File | CustomFile | null;
  docImage?: string | File | CustomFile | null;
  docImages?: string[] | File[] | CustomFile[] | (string | File | CustomFile)[];
  description?: string;
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export type IProductState = {
  isLoading: boolean;
  error: Error | string | null;
  products: IProduct[];
  product: IProduct | null;
};
