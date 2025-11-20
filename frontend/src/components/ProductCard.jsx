import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { formatIdr } from "../utils/currency";
import SizeColorPopup from "./SizeColorPopup";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [showPopup, setShowPopup] = useState(false);

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			setShowPopup(true);
		}
	};

	const handleConfirm = (selectedSize, selectedColor) => {
		addToCart(product, selectedSize, selectedColor);
		setShowPopup(false);
	};

	return (
		<div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-300 shadow-md bg-white">
			<div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
				<Link to={`/product/${product._id}`}>
					<img className="object-cover w-full cursor-pointer" src={product.image} alt="product image" />
				</Link>
			</div>

			<div className="mt-4 px-5 pb-5">
				<h5 className="text-xl font-semibold tracking-tight text-brown-800">{product.name}</h5>
				<div className="mt-2 mb-5 flex items-center justify-between">
					<p>
						<span className="text-3xl font-bold text-brown-600">{formatIdr(product.price)}</span>
					</p>
				</div>
				<button
					className="flex items-center justify-center rounded-lg bg-brown-600 px-5 py-2.5 text-center text-sm font-medium
					text-white hover:bg-brown-700 focus:outline-none focus:ring-4 focus:ring-brown-300"
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className="mr-2" />
					Add to cart
				</button>
			</div>
			{showPopup && (
				<SizeColorPopup
					product={product}
					onClose={() => setShowPopup(false)}
					onConfirm={handleConfirm}
				/>
			)}
		</div>
	);
};

export default ProductCard;
