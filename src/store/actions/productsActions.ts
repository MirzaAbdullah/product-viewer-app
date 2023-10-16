import { productsModal } from "./../../modals/productsModal";
import { actionTypes } from "../../utils/contants";

const setProductsList = (data: Array<productsModal>) => {
  return {
    type: actionTypes.ListOfProducts,
    payload: data,
  };
};

export default {
  setProductsList,
};
