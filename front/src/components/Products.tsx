import { useQuery } from 'react-query'
import { ProductsTable } from './ProductTableList'
import { useState } from 'react'
import { FaTableCells } from "react-icons/fa6";
import { LuSquareStack } from "react-icons/lu";

import { ProductCardList } from './ProductCardList'
import { Button } from './Button';

export const Products = () => {
    const [viewType, setViewType] = useState<productsViewType>("table")

    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<ProductType[]> => {
            const res = await fetch('http://localhost:5000/products')
            return res.json()
        }
    })

    const toggleProductView = () => {
        setViewType((currView) => currView === "table" ? "card" : "table")
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <section className='flex flex-col items-center max-w-max gap-8'>
            <Button onClick={toggleProductView} >
                {viewType === "table" ? <LuSquareStack size={20} className="group-hover:text-slate-800" /> : <FaTableCells size={20} className="group-hover:text-slate-800" />}
            </Button>
            <div className='w-full h-full'>
                {viewType === "table" ? <ProductsTable products={data} /> : <ProductCardList products={data} />}
            </div>
        </section>
    )
}