import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, X } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Running", "Formal", "Casual", "School", "Basketball", "Hiking"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		size: [],
		color: [],
	});
	const [sizeInput, setSizeInput] = useState("");
	const [colorInput, setColorInput] = useState("");

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "", size: [], color: [] });
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); 
		}
	};

	return (
		<motion.div
			className='bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto border border-gray-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-brown-600'>Buat Produk baru</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
						Nama Produk
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2
						 px-3 text-gray-900 focus:outline-none focus:ring-2
						focus:ring-brown-500 focus:border-brown-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-700'>
						Deskripsi
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm
						 py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500 
						 focus:border-brown-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-700'>
						Harga (in Rupiah)
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='1000'
						placeholder='e.g., 150000'
						className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm 
						py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500
						 focus:border-brown-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-gray-700'>
						Kategori
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-white border border-gray-300 rounded-md
						 shadow-sm py-2 px-3 text-gray-900 focus:outline-none 
						 focus:ring-2 focus:ring-brown-500 focus:border-brown-500'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						

						))}
						
						

					</select>

				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Ukuran
					</label>
					<div className='mt-1 flex space-x-2'>
						<input
							type='text'
							value={sizeInput}
							onChange={(e) => setSizeInput(e.target.value)}
							placeholder='Enter size (e.g., 36)'
							className='block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500'
						/>
						<button
							type='button'
							onClick={() => {
								if (sizeInput.trim()) {
									setNewProduct({ ...newProduct, size: [...newProduct.size, sizeInput.trim()] });
									setSizeInput("");
								}
							}}
							className='bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700'
						>
							Tambah
						</button>
					</div>
					<div className='mt-2 space-y-1'>
						{newProduct.size.map((s, index) => (
							<div key={index} className='flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md'>
								<span>{s}</span>
								<button
									type='button'
									onClick={() => setNewProduct({ ...newProduct, size: newProduct.size.filter((_, i) => i !== index) })}
									className='text-red-500 hover:text-red-700'
								>
									<X className='h-4 w-4' />
								</button>
							</div>
						))}
					</div>
				</div>
				
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Warna
					</label>
					<div className='mt-1 flex space-x-2'>
						<input
							type='text'
							value={colorInput}
							onChange={(e) => setColorInput(e.target.value)}
							placeholder='Enter color (e.g., merah)'
							className='block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-brown-500'
						/>
						<button
							type='button'
							onClick={() => {
								if (colorInput.trim()) {
									setNewProduct({ ...newProduct, color: [...newProduct.color, colorInput.trim()] });
									setColorInput("");
								}
							}}
							className='bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700'
						>
							Tambah
						</button>
					</div>
					<div className='mt-2 space-y-1'>
						{newProduct.color.map((c, index) => (
							<div key={index} className='flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md'>
								<span>{c}</span>
								<button
									type='button'
									onClick={() => setNewProduct({ ...newProduct, color: newProduct.color.filter((_, i) => i !== index) })}
									className='text-red-500 hover:text-red-700'
								>
									<X className='h-4 w-4' />
								</button>
							</div>
						))}
					</div>
				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Gambar
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-gray-600'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Buat produk
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;
