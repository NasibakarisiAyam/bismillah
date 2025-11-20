import React, { useState } from "react";

const SizeColorPopup = ({ product, onClose, onConfirm }) => {
	const [selectedSize, setSelectedSize] = useState(product.size[0] || "");
	const [selectedColor, setSelectedColor] = useState(product.color[0] || "");

	const handleConfirm = () => {
		onConfirm(selectedSize, selectedColor);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg p-6 w-96 max-w-full">
				<h2 className="text-xl font-semibold mb-4">Pilih warna sm ukuranny</h2>
				<div className="mb-4">
					<img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
				</div>
				<div className="mb-4">
					<label className="block mb-1 font-medium">Ukuran:</label>
					<select
						value={selectedSize}
						onChange={(e) => setSelectedSize(e.target.value)}
						className="w-full border border-gray-300 rounded px-3 py-2"
					>
						{product.size.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
				<div className="mb-4">
					<label className="block mb-1 font-medium">Warna:</label>
					<select
						value={selectedColor}
						onChange={(e) => setSelectedColor(e.target.value)}
						className="w-full border border-gray-300 rounded px-3 py-2"
					>
						{product.color.map((color) => (
							<option key={color} value={color}>
								{color}
							</option>
						))}
					</select>
				</div>
				<div className="flex justify-end space-x-4">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
					>
						G jadi
					</button>
					<button
						onClick={handleConfirm}
						className="px-4 py-2 rounded bg-brown-600 text-white hover:bg-brown-700"
					>
						Y jadi
					</button>
				</div>
			</div>
		</div>
	);
};

export default SizeColorPopup;
