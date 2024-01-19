import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { ProductType } from './Product'

export const Products = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<ProductType[]> => {
            const res = await fetch('http://localhost:5000/products')
            return res.json()
        }
    })

    console.log({ data, isLoading })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full text-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => (
                        <tr key={product.product_id}>
                            <td className="py-2 px-4 border-b">
                                <Link
                                    to={`/productos/${product.product_id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {product.product_name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
