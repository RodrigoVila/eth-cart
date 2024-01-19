import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

export type ProductType = {
    product_id: number
    product_name: string
    unit_price: number
}

export const Product = () => {
    const params = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async (): Promise<ProductType> => {
            const res = await fetch(`http://localhost:5000/products/${params.id}`)
            return res.json()
        }
    })

    console.log({ data, isLoading })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="border-2 rounded-xl flex flex-col p-10 w-max gap-2">
            <h4 className='text-2xl '>Product</h4>
            <div className='flex gap-2'>
                <h6>ID</h6>
                <p>{data?.product_id}</p>
            </div>
            <div className='flex gap-2'>
                <h6>Name</h6>
                <p>{data?.product_name}</p>
            </div>
            <div className='flex gap-2'>
                <h6>Price</h6>
                <p>{data?.unit_price}</p>
            </div>
        </div>
    )
}
