export const productsTableHeaders = {
  image: "",
  title: "Product Name",
  price: "Price (€)",
};

export const productsTableRowsWidth = {
  image: 100,
  title: 220,
  price: 80,
};

export interface productsModal {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
