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
      // Primeiro, fazer upload das imagens para S3
      const uploadedImageUrls: string[] = [];
      
      // Upload da imagem principal (image)
      if (product.image && typeof product.image === 'object' && 'name' in product.image) {
        const formData = new FormData();
        formData.append('image', product.image as File);
        
        const imageResponse = await axios.post(`${HOST_API}/api/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (imageResponse.data.success && imageResponse.data.image) {
          uploadedImageUrls.push(imageResponse.data.image);
        }
      }
      
      // Upload das imagens adicionais (images)
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        const imageFiles = product.images.filter(img => 
          typeof img === 'object' && 'name' in img
        ) as File[];
        
        if (imageFiles.length > 0) {
          const formData = new FormData();
          imageFiles.forEach(file => {
            formData.append('images', file);
          });
          
          const imagesResponse = await axios.post(`${HOST_API}/api/upload/images`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          if (imagesResponse.data.success && imagesResponse.data.images) {
            uploadedImageUrls.push(...imagesResponse.data.images);
          }
        }
      }
      
      // Preparar dados do produto com URLs das imagens
      const productData = {
        ...product,
        images: uploadedImageUrls, // Substituir File objects por URLs do S3
      };
      
      // Remover campos de imagem que não são necessários no backend
      delete productData.image;
      delete productData.docImage;
      delete productData.docImages;
      
      console.log('Enviando dados do produto com imagens S3:', productData);
      
      // Registrar o produto com as URLs das imagens
      const response = await axios.post(`${HOST_API}/api/property/register`, productData);
      
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error('Erro no registro do produto:', error);
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}
