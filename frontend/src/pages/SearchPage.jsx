import { useEffect, useState } from "react";
import { useSearchStore } from "../stores/useSearchStore";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
	const { searchResults, fetchSearchResults } = useSearchStore();
	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		if (q) {
			fetchSearchResults(q, sortBy, sortOrder);
		}
	}, [q, sortBy, sortOrder, fetchSearchResults]);

	return (
		<div className="min-h-screen bg-white">
			<div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-brown-800 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Hasil Pencarian untuk "{q}"
				</motion.h1>

				<div className="flex justify-center mb-8 space-x-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Urutkan berdasarkan:</label>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
						>
							<option value="name">Nama</option>
							<option value="price">Harga</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Urutan:</label>
						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value)}
							className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
						>
							<option value="asc">A-Z / Rendah ke Tinggi</option>
							<option value="desc">Z-A / Tinggi ke Rendah</option>
						</select>
					</div>
				</div>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{searchResults?.length === 0 && (
						<h2 className="text-3xl font-semibold text-brown-400 text-center col-span-full">
							Tidak ada produk ditemukan
						</h2>
					)}

					{searchResults?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default SearchPage;
