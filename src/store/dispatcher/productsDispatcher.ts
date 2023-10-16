import { productsModal } from "./../../modals/productsModal";
import { actionTypes } from "../../utils/contants";
import store from "../configureStore";
import allActions from "../actions";

const { dispatch } = store;

export const ProductsDispatcher = (actionType: actionTypes, data: unknown) => {
  const productsAction = allActions.productsActions;

  switch (actionType) {
    case actionTypes.ListOfProducts:
      dispatch(productsAction.setProductsList(data as Array<productsModal>));
      break;
  }
};
