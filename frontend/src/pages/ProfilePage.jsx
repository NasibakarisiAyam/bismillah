import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
	const { user, loading, logout, checkingAuth } = useUserStore();
	const navigate = useNavigate();

	useEffect(() => {
		// Redirect to login if not authenticated and not currently checking auth
		if (!user && !checkingAuth && !loading) {
			navigate("/login");
		}
	}, [user, checkingAuth, loading, navigate]);

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	if (checkingAuth || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
				<p className="text-xl text-amber-800">Memuat profil...</p>
			</div>
		);
	}

	if (!user) {
		return null; // Should be redirected by useEffect
	}

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-amber-200">
				<div className="text-center">
					<motion.h2
						className="mt-6 text-4xl font-extrabold text-amber-900"
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						Profil Pengguna
					</motion.h2>
					<motion.p
						className="mt-2 text-lg text-amber-600"
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						Informasi akun Anda
					</motion.p>
				</div>
				<div className="mt-8 space-y-6">
					<div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
						<p className="text-sm font-medium text-amber-700">Nama:</p>
						<p className="mt-1 text-lg font-semibold text-amber-900">{user.name}</p>
					</div>
					<div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
						<p className="text-sm font-medium text-amber-700">Email:</p>
						<p className="mt-1 text-lg font-semibold text-amber-900">{user.email}</p>
					</div>
					<motion.button
						onClick={handleLogout}
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						<LogOut className="h-6 w-6 mr-2" /> Keluar
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default ProfilePage;