import { createSlice, Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axios';
// config-global
import { HOST_API } from 'src/config-global';
// @types
import { IProductState, IProduct } from '../../@types/product';

// ----------------------------------------------------------------------

const initialState: IProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const {} = slice.actions;

// ----------------------------------------------------------------------

export function getAllProducts() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${HOST_API}/api/property`);
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProducts(params: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // Transformar os parâmetros do formulário para o formato esperado pelo backend
      const searchParams = {
        categories: params.services || [],
        keyword: params.keyword || '',
        location: params.location || '',
        city: params.city,
        state: params.state,
        neighborhood: params.neighborhood,
        minPrice: params.minPrice || '',
        maxPrice: params.maxPrice || '',
        subFeatures: params.subFeatures || {},
        skip: 0,
        limit: 20
      };

      console.log('Sending search params:', searchParams);

      const response = await axios.get(`${HOST_API}/api/property/get`, {
        params: searchParams,
      });
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      console.error('Search error:', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${HOST_API}/api/property`, {
        params: { id },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function registerProduct(product: IProduct) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${HOST_API}/api/property/register`, {
        ...product,
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
