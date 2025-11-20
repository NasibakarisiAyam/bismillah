import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

    useEffect(() => {
        getMyCoupon();
    }, [getMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);

    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        applyCoupon(userInputCode);
    };

    const handleRemoveCoupon = async () => {
        await removeCoupon();
        setUserInputCode("");
    };

    return (
        <motion.div
            className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className='space-y-4'>
                <div>
                    <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-gray-900'>
                        Do you have a voucher or gift card?
                    </label>
                    <input
                        type='text'
                        id='voucher'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50
            p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brown-500
            focus:ring-brown-500'
                        placeholder='Enter code here'
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        required
                    />
                </div>

                <motion.button
                    type='button'
                    onClick={handleApplyCoupon}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-lg bg-brown-600 px-5 py-2.5 text-white font-medium hover:bg-brown-700 transition"
                >
                    Apply Code
                </motion.button>
            </div>
            {isCouponApplied && coupon && (
                <div className='mt-4'>
                    <h3 className="text-lg font-medium text-brown-700">Applied Coupon</h3>
                    <p className='mt-2 text-sm text-gray-600'>
                        {coupon.code} - <span className="text-green-600">{coupon.discountPercentage}% off</span>
                    </p>
                    <motion.button
                        type='button'
                        className='mt-4 flex w-full items-center justify-center rounded-lg bg-red-600
            px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
            focus:ring-4 focus:ring-red-300'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRemoveCoupon}
                    >
                        Remove Coupon
                    </motion.button>
                </div>
            )}

            {coupon && !isCouponApplied && (
                <div className='mt-4'>
                    <h3 className='text-lg font-medium text-gray-900'>Your Available Coupon:</h3>
                    <p className='mt-2 text-sm text-gray-600'>
                        {coupon.code} - <span className="text-green-600">{coupon.discountPercentage}% off</span>
                    </p>
                </div>
            )}
        </motion.div>
    );
};
export default GiftCouponCard;