import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { selectToken } from "../user/selectors";
import { updateProducts, updateProduct, updateSearchResult } from "./slice";


//fetch all products
export const getProducts = (term) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    try {
      const response = await axios.get(`${apiUrl}/products`, { params: { term: term } });
      if (term) {
        dispatch(updateSearchResult(response.data))
      } else {
        dispatch(
          updateProducts(response.data)
        );
      }
      dispatch(appDoneLoading());

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

//fetch product by ID 
export const getProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/products/${id}`);
      dispatch(
        updateProduct(response.data)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

//Post a product  
export const postProduct = (product) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());

    try {
      const response = await axios.post(`${apiUrl}/products/post`, { product }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(
        updateProduct(response.data.postProduct)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};