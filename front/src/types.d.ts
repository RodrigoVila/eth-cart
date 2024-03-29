type ProductType = {
  product_id: number | undefined;
  product_name: string;
  unit_price: number;
  quantity: number;
  item_total: number;
};

type ProductsListProps = { products?: ProductType[]; isCartTable?: boolean };

type productsViewType = "table" | "card";

type FormValues = {
  quantity: number;
};

type TxData = {
  hash: string | null;
  error: string | null;
};

type TxParams = {
  to: string;
  from: string;
  value: string;
};
