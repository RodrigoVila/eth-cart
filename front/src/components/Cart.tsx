import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { Context } from '../context'
import { ProductsTable } from './ProductTableList'
import { Button } from './Button'

const INITIAL_TX_DATA = { hash: null, error: null }

export const Cart = () => {
    const [txData, setTxData] = useState<TxData>(INITIAL_TX_DATA)

    const { state: { currentAccount, cart }, setState } = useContext(Context)

    const wallet = window.ethereum;

    const total = cart.reduce((acc, { item_total }) => acc + item_total, 0)
    const isCartEmpty = cart.length === 0

    const connect = async () => {
        if (wallet) {
            const accounts = await wallet.request({ method: "eth_requestAccounts" })

            setState((currentState) => ({
                ...currentState,
                currentAccount: accounts[0]
            }))
        }
    }

    const handlePayment = async () => {
        if (!currentAccount) return

        setTxData(INITIAL_TX_DATA)

        const txParams: TxParams = {
            to: import.meta.env.VITE_BUSINESS_ADDRESS,
            from: currentAccount,
            value: ethers.toBeHex(ethers.parseEther(total.toString()))
        }
        console.log({ txParams })

        try {
            const txHash = await wallet.request({
                method: "eth_sendTransaction",
                params: [txParams]
            })
            setTxData({ error: null, hash: txHash })
        } catch (err) {
            console.error({ error: err })
            if (err instanceof Error) {
                setTxData({ error: err.message, hash: null })
            }
        }
    }

    useEffect(() => {
        connect()

        wallet.on("accountsChanged", (accounts: string[]) =>
            setState((currentState) => ({
                ...currentState,
                currentAccount: accounts[0]
            }))
        );
    }, [window])

    if (isCartEmpty) return <div className='text-2xl'>Cart is empty</div>

    return (
        <section className='flex flex-col items-center gap-8'>
            <ProductsTable products={cart} isCartTable />

            <h3 className='text-2xl font-bold'>{`Total $ ${total.toFixed(2)}`}</h3>

            <Button className='px-10 text-2xl' onClick={handlePayment} >
                Pay
            </Button>

            {txData.hash &&
                <p className='text-green-500 font-semibold text-lg justify-center w-full flex flex-col text-center'>
                    <span>Success! TxHash:</span>
                    <span>{txData.hash}</span>
                </p>
            }

            {txData.error &&
                <p className='text-red-500 font-semibold text-lg'>{txData.error}</p>
            }
        </section>
    )
}
