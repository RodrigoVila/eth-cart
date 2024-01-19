import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Layout } from './components/Layout.tsx'
import { Products } from './components/Products.tsx'
import { Product } from './components/Product.tsx'
import { Cart } from './components/Cart.tsx'
import { ContextProvider } from './context.tsx'

import './index.css'

const queryClient = new QueryClient()

export const App = () => {
    return (
        <ContextProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Products />} />
                            {/* <Route path="*" element={<Products />} /> */}
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<Product />} />
                            <Route path="/cart" element={<Cart />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ContextProvider>
    )
}
