import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Context } from "../context";

export const Layout = () => {
    const { pathname } = useLocation()

    const { state: { currentAccount } } = useContext(Context)

    const isProductsPath = pathname.includes("products")
    const isCartPath = pathname.includes("cart")

    const bgColor = isProductsPath ? "bg-slate-900" : "bg-slate-950"

    return (
        <div className="w-full h-full min-w-screen">
            <nav className="w-full px-6 h-12 bg-slate-800 flex items-center justify-between text-white gap-6 m-0">
                {currentAccount ? <h5 className="items-center justfy-center flex text-xl h-full">{`${currentAccount.slice(0, 5)}...${currentAccount.slice(-5)}`}</h5> : null}

                <div className="flex gap-6 h-full items-center ml-auto">
                    <Link to="/cart" className={`text-slate-400 hover:text-white hover:font-extrabold duration-300 ${isCartPath ? "!text-white !font-extrabold" : ""}`}>Cart</Link>
                    <Link to="/products" className={`text-slate-400 hover:text-white hover:font-extrabold duration-300 ${isProductsPath ? "!text-white !font-extrabold" : ""}`}>Products</Link>
                </div>
            </nav>

            <main className={`w-full h-full min-h-screen text-white flex items-center justify-center p-10 ${bgColor}`}>
                <Outlet />
            </main>
        </div>
    );
}
