import { actionTypes, baseUrl } from "../utils/contants";
import { httpClient } from "./utilities/httpClient";

import { productsModal } from "./../modals/productsModal";
import { logError } from "./utilities/logService";
import { ProductsDispatcher } from "../store/dispatcher/productsDispatcher";

export const getAllProducts = async () => {
  let allProductsFetchResult: Array<productsModal> = [];

  await httpClient({
    baseURL: baseUrl,
    type: "GET",
    path: "/products",
  })
    .then((result) => {
      allProductsFetchResult = result.data;
    })
    .catch((error) => {
      logError(error);
    });

  ProductsDispatcher(actionTypes.ListOfProducts, allProductsFetchResult);
};
