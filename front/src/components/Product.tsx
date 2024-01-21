import { useContext, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Context } from '../context'
import { Card } from './Card'

export const Product = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state, setState } = useContext(Context)

    const { data: productData, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async (): Promise<ProductType> => {
            const res = await fetch(`http://localhost:5000/products/${id}`)
            return res.json()
        }
    })

    const currentQuantity = useMemo(
        () =>
            state?.cart.find((product) => product.product_id === Number(id))
                ?.quantity,
        [state?.cart, id],
    );

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, } } = useForm<FormValues>({
        defaultValues: { quantity: currentQuantity },
    });

    const onSubmit = (formData: FormValues) => {
        if (!productData) return
        const { quantity } = formData

        setState((currState) => {
            const updatedCart = [...currState.cart]
            const existingProductIndex = currState.cart.findIndex((cartProduct) => cartProduct.product_id === productData.product_id);
            const unitPrice = productData.unit_price

            if (existingProductIndex !== -1) {
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity,
                    item_total: unitPrice * quantity
                }
            } else {
                updatedCart.push({
                    ...productData,
                    quantity,
                    item_total: unitPrice * quantity
                })
            }
            return { ...currState, cart: updatedCart }
        })
    }

    useEffect(() => {
        isSubmitSuccessful && navigate("/cart")
    }, [isSubmitSuccessful, navigate])


    if (isLoading) return <div>Loading...</div>

    return productData ? (
        <section className='flex flex-col gap-5 items-center'>
            <Card product={productData} />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full'>
                <div className='flex items-center justify-center gap-5'>
                    <label>Quantity:</label>
                    <input {...register("quantity", { required: true })} type="number" min={1} className='text-black rounded-md py-1 w-20 p-2 font-bold text-lg' />
                </div>
                <button type='submit' className='w-full py-2 px-6 border-2 rounded-lg border-white hover:text-slate-900 hover:bg-white transition-all duration-200'>Add to cart</button>
                {errors.quantity && <span className='text-red-500 text-center'>Error: Quantity required</span>}
            </form>
        </section>
    ) : null
}
