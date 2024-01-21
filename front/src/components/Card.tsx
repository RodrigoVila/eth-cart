import { Link } from "react-router-dom"

type CardProps = {
    product: ProductType,
    hasLinkToProduct?: boolean
}

export const Card = ({ product, hasLinkToProduct = false }: CardProps) => {
    return hasLinkToProduct ? (
        <Link to={`/products/${product.product_id}`} aria-disabled={hasLinkToProduct}>
            <CardProduct product={product} hasLinkToProduct={hasLinkToProduct} />
        </Link>
    ) : <CardProduct product={product} />
}

const CardProduct = ({ product, hasLinkToProduct = false }: CardProps) => {
    const { product_id, product_name, unit_price } = product

    return (
        <div className={`border-2 rounded-xl flex flex-col gap-5 p-10 text-xl w-64 hover:text-slate-900 hover:bg-white cursor-pointer transition-all duration-300 ${hasLinkToProduct ? "" : "pointer-events-none cursor-default"}`}>
            <div className='flex gap-2 justify-between'>
                <h6>ID:</h6>
                <Link
                    to={`/products/${product_id}`}
                    className="text-blue-500 hover:underline"
                >
                    {product_id}
                </Link>
            </div>

            <div className='flex gap-2 justify-between'>
                <h6>Name:</h6>
                <p className="truncate">{product_name}</p>
            </div>

            <div className='flex gap-2 justify-between'>
                <h6>Price:</h6>
                <p>{unit_price}</p>
            </div>
        </div>
    )
}
