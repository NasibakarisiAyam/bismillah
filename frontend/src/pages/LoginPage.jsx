import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const { login, loading, user } = useUserStore();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-brown-800">
					Login Ke Akun Anda
				</h2>
			</motion.div>

			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className="bg-white border border-brown-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-brown-600">
								Email 
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-brown-400" aria-hidden="true" />
								</div>
								<input
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full px-3 py-2 pl-10 bg-white border border-brown-300 
									 rounded-md shadow-sm placeholder-brown-300 focus:outline-none 
									 focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
									placeholder="you@example.com"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-brown-600">
								Password
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-brown-400" aria-hidden="true" />
								</div>
								<input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full px-3 py-2 pl-10 bg-white border border-brown-300 
									 rounded-md shadow-sm placeholder-brown-300 focus:outline-none 
									 focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent 
							 rounded-md shadow-sm text-sm font-medium text-white bg-brown-600
							 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-brown-500 transition duration-150 ease-in-out disabled:opacity-50"
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
									Loading...
								</>
							) : (
								<>
									<LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
									Login
								</>
							)}
						</button>
					</form>

					<p className="mt-8 text-center text-sm text-brown-500">
						Belum punya akun?{" "}
						<Link
							to="/signup"
							className="font-medium text-brown-700 hover:text-brown-900"
						>
							Daftar sekarang <ArrowRight className="inline h-4 w-4" />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
