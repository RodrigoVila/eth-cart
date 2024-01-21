import { Card } from './Card'

export const ProductCardList = ({ products }: ProductsListProps) => {
  if (!products) return <span>No data...</span>

  return <div className='flex flex-wrap gap-4 items-center justify-center w-full'>{products.map((product) => <Card product={product} hasLinkToProduct />)}</div>
}
