import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useSearchStore } from "../stores/useSearchStore";
import { useState, useEffect } from "react";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const { searchTerm, setSearchTerm, searchResults, fetchSearchResults } = useSearchStore();
	const navigate = useNavigate();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		fetchSearchResults(searchTerm);
	}, [searchTerm, fetchSearchResults]);

	const categories = [
		"Running",
		"Formal",
		"Casual",
		"School",
		"Basketball",
		"Hiking",
	];

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleResultClick = (result) => {
		if (result.type === "category") {
			navigate(`/category/${result.name}`);
		} else if (result.type === "product") {
			navigate(`/product/${result._id}`);
		}
		setSearchTerm("");
		setMobileMenuOpen(false);
	};

	const filteredCategories = categories.filter((cat) =>
		cat.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const combinedResults = [
		...filteredCategories.map((cat) => ({ type: "category", name: cat })),
		...searchResults.map((prod) => ({ type: "product", ...prod })),
	];

	return (
		<header className='fixed top-0 left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 border-b border-gray-200'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex justify-between items-center'>
					{/* Logo */}
					<Link to='/' className='text-2xl font-bold text-brown-600 items-center space-x-2 flex z-50'>
						ShoesKarman
					</Link>

					{/* Desktop Search Bar */}
					<div className="relative flex-grow max-w-md mx-4 hidden md:block">
						<input
							type="text"
							placeholder="Cari kategori atau produk..."
							value={searchTerm}
							onChange={handleSearchChange}
							onKeyDown={(e) => {
								if (e.key === "Enter" && searchTerm.trim() !== "") {
									navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
									setSearchTerm("");
								}
							}}
							className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brown-600"
						/>
						{searchTerm.trim() !== "" && combinedResults.length > 0 && (
							<ul className='absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-auto z-50 shadow-lg'>
								{combinedResults.map((result, index) => (
									<li
										key={index}
										className='px-3 py-2 hover:bg-brown-100 cursor-pointer'
										onClick={() => handleResultClick(result)}
									>
										{result.type === "category" ? "Kategori: " : "Produk: "}
										{result.name}
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-700 hover:text-brown-600 transition duration-300 ease-in-out'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-700 hover:text-brown-600 transition duration-300 ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-brown-600' size={20} />
								<span>Keranjang</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-brown-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-brown-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-brown-600 hover:bg-brown-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-brown-600 hover:bg-brown-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 rounded-md text-brown-600 hover:bg-brown-100 focus:outline-none focus:ring-2 focus:ring-brown-600 z-50"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				<div className={`md:hidden fixed top-[60px] left-0 w-full bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
					<div className='px-4 py-4 space-y-4'>
						{/* Mobile Search Bar */}
						<div className="relative">
							<input
								type="text"
								placeholder="Cari kategori atau produk..."
								value={searchTerm}
								onChange={handleSearchChange}
								onKeyDown={(e) => {
									if (e.key === "Enter" && searchTerm.trim() !== "") {
										navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
										setSearchTerm("");
										setMobileMenuOpen(false);
									}
								}}
								className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brown-600"
							/>
							{searchTerm.trim() !== "" && combinedResults.length > 0 && (
								<ul className='absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-auto z-50 shadow-lg'>
									{combinedResults.map((result, index) => (
										<li
											key={index}
											className='px-3 py-2 hover:bg-brown-100 cursor-pointer'
											onClick={() => handleResultClick(result)}
										>
											{result.type === "category" ? "Kategori: " : "Produk: "}
											{result.name}
										</li>
									))}
								</ul>
							)}
						</div>

						{/* Mobile Navigation Links */}
						<Link
							to={"/"}
							className='text-gray-700 hover:text-brown-600 transition duration-300 ease-in-out block py-2 px-2 hover:bg-brown-50 rounded-md'
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						
						{user && (
							<Link
								to={"/cart"}
								className='text-gray-700 hover:text-brown-600 transition duration-300 ease-in-out block py-2 px-2 hover:bg-brown-50 rounded-md'
								onClick={() => setMobileMenuOpen(false)}
							>
								<ShoppingCart className='inline-block mr-2' size={20} />
								<span>Keranjang</span>
								{cart.length > 0 && (
									<span className='ml-2 bg-brown-500 text-white rounded-full px-2 py-0.5 text-xs'>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						
						{isAdmin && (
							<Link
								className='bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out flex items-center justify-center w-full'
								to={"/secret-dashboard"}
								onClick={() => setMobileMenuOpen(false)}
							>
								<Lock className='mr-2' size={18} />
								<span>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out w-full'
								onClick={() => {
									logout();
									setMobileMenuOpen(false);
								}}
							>
								<LogOut size={18} />
								<span className='ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-brown-600 hover:bg-brown-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out w-full'
									onClick={() => setMobileMenuOpen(false)}
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out w-full'
									onClick={() => setMobileMenuOpen(false)}
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
export default Navbar;