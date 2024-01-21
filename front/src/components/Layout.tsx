import { Link, Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
    const { pathname } = useLocation()

    const isProductsPath = pathname.includes("products")
    const isCartPath = pathname.includes("cart")

    const bgColor = isProductsPath ? "bg-slate-900" : "bg-slate-950"

    return (
        <div className="w-full h-full min-w-screen">
            <nav className="w-full px-6 h-12 bg-slate-800 flex items-center justify-end text-white gap-6 font-bold m-0">
                <Link to="/cart" className={`hover:text-xl duration-300 ${isCartPath ? "text-xl" : ""}`}>Cart</Link>
                <Link to="/products" className={`hover:text-xl duration-300 ${isProductsPath ? "text-xl" : ""}`}>Products</Link>
            </nav>
            <main className={`w-full h-full min-h-screen text-white flex items-center justify-center p-10 ${bgColor}`}>
                <Outlet />
            </main>
        </div>
    );
}
