import { actionTypes } from "../../utils/contants";
import { productsState } from "../state/productsState";

const productsReducer = (state = productsState, action: any) => {
  switch (action.type) {
    case actionTypes.ListOfProducts:
      return {
        ...state,
        productsList: action.payload,
        isProductListLoaded: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
