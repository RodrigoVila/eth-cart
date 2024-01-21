import { Link } from "react-router-dom"

type CardProps = {
    product?: ProductType,
    hasLinkToProduct?: boolean
}

export const Card = ({ product, hasLinkToProduct = false }: CardProps) => {
    if (!product) return null

    return hasLinkToProduct ? (
        <Link to={`/products/${product.product_id}`} aria-disabled={hasLinkToProduct}>
            <CardProduct product={product} hasLinkToProduct={hasLinkToProduct} />
        </Link>
    ) : <CardProduct product={product} />
}

const CardProduct = ({ product, hasLinkToProduct = false }: CardProps) => {
    return (
        <div className={`border-2 rounded-xl flex flex-col gap-5 p-10 text-xl w-64 hover:text-slate-900 hover:bg-white cursor-pointer transition-all duration-300 ${hasLinkToProduct ? "" : "pointer-events-none cursor-default"}`}>
            <div className='flex gap-2 justify-between'>
                <h6>ID:</h6>
                <p>{product?.product_id}</p>
            </div>
            <div className='flex gap-2 justify-between'>
                <h6>Name:</h6>
                <p className="truncate">{product?.product_name}</p>
            </div>
            <div className='flex gap-2 justify-between'>
                <h6>Price:</h6>
                <p>{product?.unit_price}</p>
            </div>
        </div>
    )
}
