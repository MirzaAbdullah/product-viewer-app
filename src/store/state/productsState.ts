import { productsModal } from "./../../modals/productsModal";

interface productsProps {
  productsList: Array<productsModal>;
  isProductListLoaded: boolean;
}

export const productsState: productsProps = {
  productsList: [],
  isProductListLoaded: false,
};
