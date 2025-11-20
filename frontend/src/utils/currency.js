/**
 * Currency utility functions for converting USD to IDR
 * Exchange rate: 1 USD = 15,000 IDR
 */

const USD_TO_IDR_RATE = 15000;

/**
 * Convert USD amount to IDR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} - Amount in IDR
 */
export const convertUsdToIdr = (usdAmount) => {
	return Math.round(usdAmount * USD_TO_IDR_RATE);
};

/**
 * Format IDR currency with proper separators
 * @param {number} amount - Amount in IDR
 * @returns {string} - Formatted IDR string
 */
export const formatIdr = (amount) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

/**
 * Format IDR currency without currency symbol
 * @param {number} amount - Amount in IDR
 * @returns {string} - Formatted number string
 */
export const formatIdrNumber = (amount) => {
	return new Intl.NumberFormat('id-ID').format(amount);
};

/**
 * Convert and format USD to IDR
 * @param {number} usdAmount - Amount in USD
 * @returns {string} - Formatted IDR string
 */
export const convertAndFormatIdr = (usdAmount) => {
	const idrAmount = convertUsdToIdr(usdAmount);
	return formatIdr(idrAmount);
};
