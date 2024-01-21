import { Link, useNavigate } from 'react-router-dom'

export const ProductsTable = ({ products, isCartTable = false }: ProductsListProps) => {
    const navigate = useNavigate()

    if (!products) return <span>No data...</span>

    return (
        <div className="container mx-auto px-10">
            <table className="min-w-full text-white border border-gray-300">
                <thead className='text-left'>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        {isCartTable ?
                            <>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Total</th>
                            </>
                            : null}
                    </tr>
                </thead>
                <tbody className='text-left'>
                    {products?.map(({ product_id, product_name, unit_price, quantity, item_total }) => (
                        <tr key={product_id} className='hover:bg-white hover:text-slate-900 cursor-pointer' onClick={() => navigate(`/products/${product_id}`)}>
                            <td className="py-2 px-4 border-b">
                                <Link
                                    to={`/products/${product_id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {product_id}
                                </Link>
                            </td>
                            <td className="py-2 px-4 border-b">
                                {product_name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {`$ ${unit_price.toFixed(2)}`}
                            </td>
                            {isCartTable ?
                                <>
                                    <th className="py-2 px-4 border-b">{quantity}</th>
                                    <th className="py-2 px-4 border-b">{`$ ${item_total.toFixed(2)}`}</th>
                                </>
                                : null}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
