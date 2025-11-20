import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='py-12 md:py-20 bg-white min-h-screen'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<div className='mt-8 md:gap-8 lg:flex lg:items-start xl:gap-12'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6'>
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-8 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-6 py-20 px-4 text-center bg-brown-500 rounded-xl shadow-lg'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-20 w-20 text-white' />
		<h3 className='text-3xl font-bold text-white'>Keranjang Anda kosong</h3>
		<p className='text-white/80 max-w-md'>
			Sepertinya Anda belum menambahkan apa pun ke keranjang. Ayo temukan sesuatu yang Anda sukai!
		</p>
		<Link
			to='/'
			className='inline-block mt-4 rounded-lg bg-white px-8 py-3 text-brown-600 text-sm font-bold hover:bg-gray-200 transition-colors duration-300'
		>
			Mulai Belanja
		</Link>
	</motion.div>
);
