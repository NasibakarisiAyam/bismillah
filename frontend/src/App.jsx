import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-amber-900 relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					{/* Subtle Pattern Overlay */}
					<div className='absolute top-0 left-0 w-full h-full opacity-5 bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-100' />
					
					{/* Decorative Circles */}
					<div className='absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl' />
					<div className='absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/30 rounded-full blur-3xl' />
					<div className='absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/search' element={<SearchPage />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
