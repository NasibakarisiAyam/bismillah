import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { formatIdr } from "../utils/currency";

const ProductPage = () => {
	const { id } = useParams();
	const { fetchProductById, currentProduct } = useProductStore();
	const { addToCart } = useCartStore();
	const { user } = useUserStore();
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	useEffect(() => {
		if (id) {
			fetchProductById(id);
		}
	}, [id, fetchProductById]);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Login dlu km pok", { id: "login" });
			return;
		}
		if (!selectedSize || !selectedColor) {
			toast.error("Pilih dlu warna sm ukuranya bot");
			return;
		}
		const productWithSelection = {
			...currentProduct,
			selectedSize,
			selectedColor,
		};
		addToCart(productWithSelection);
	};

	if (!currentProduct) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p>Loading product details...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-brown-800 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{currentProduct.name}
				</motion.h1>

				<motion.div
					className="flex flex-col lg:flex-row gap-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					
					<div className="lg:w-1/2">
						<div className="relative h-96 lg:h-full overflow-hidden rounded-xl">
							<img className="object-cover w-full h-full" src={currentProduct.image} alt="product image" />
						</div>
					</div>

					
					<div className="lg:w-1/2 flex flex-col justify-center">
						<h5 className="text-3xl font-bold text-brown-800 mb-4">{currentProduct.name}</h5>
						<p className="text-brown-700 mb-6">{currentProduct.description}</p>
						<div className="mb-6">
							<span className="text-4xl font-bold text-brown-600">{formatIdr(currentProduct.price)}</span>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">Ukuran</label>
							<select
								value={selectedSize}
								onChange={(e) => setSelectedSize(e.target.value)}
								className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500"
								required
							>
								<option value="">Pilih ukuran</option>
								{currentProduct.size.map((s) => (
									<option key={s} value={s}>{s}</option>
								))}
							</select>
						</div>

						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">Warna</label>
							<select
								value={selectedColor}
								onChange={(e) => setSelectedColor(e.target.value)}
								className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500"
								required
							>
								<option value="">Pilih warna</option>
								{currentProduct.color.map((c) => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>

						<button
							className="flex items-center justify-center rounded-lg bg-brown-600 px-5 py-3 text-center text-lg font-medium text-white hover:bg-brown-700 focus:outline-none focus:ring-4 focus:ring-brown-300"
							onClick={handleAddToCart}
						>
							<ShoppingCart size={24} className="mr-2" />
							Tambah Ke keranjang
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ProductPage;
