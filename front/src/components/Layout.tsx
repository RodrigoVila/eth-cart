import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="w-full h-full min-w-screen">
            <nav className="w-full h-12 bg-slate-800 flex items-center justify-center text-white gap-3 font-mono font-bold m-0">
                <Link to="/cart" className="hover:text-lg duration-150">Cesta</Link>
                <Link to="/products" className="hover:text-lg duration-150">Productos</Link>
            </nav>
            <main className="bg-slate-900 w-full h-full min-h-screen text-white flex items-center justify-center">
                <Outlet />
            </main>
        </div>
    );
}
