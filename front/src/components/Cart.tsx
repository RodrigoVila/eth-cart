import { useContext } from 'react'
import { Context } from '../context'
import { ProductsTable } from './ProductTableList'
import { Button } from './Button'

export const Cart = () => {
    const { state } = useContext(Context)
    const total = state.cart.reduce((acc, { item_total }) => acc + item_total, 0)
    const isCartEmpty = state.cart.length === 0

    return isCartEmpty ?
        <div className='text-2xl'>Cart is empty</div>
        : (<div className='flex flex-col items-center gap-8'>
            <ProductsTable products={state.cart} isCartTable />
            <h3 className='text-2xl font-bold'>{`Total $ ${total}`}</h3>
            <Button className='px-10 text-2xl' onClick={() => { }} >
                Pay
            </Button>
        </div>
        )
}
