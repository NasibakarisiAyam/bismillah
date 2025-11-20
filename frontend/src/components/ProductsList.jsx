import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { convertAndFormatIdr } from "../utils/currency";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

    console.log("products", products);

    return (
        <motion.div
            className='bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                            Produk
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                            Harga
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                            Kategori
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                            Unggulan
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                            Mau lo apain?
                        </th>
                    </tr>
                </thead>

                <tbody className='bg-white divide-y divide-gray-200'>
                    {products?.map((product) => (
                        <tr key={product._id} className='hover:bg-gray-100'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-10 w-10'>
                                        <img
                                            className='h-10 w-10 rounded-full object-cover'
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-sm font-medium text-gray-900'>{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-600'>{convertAndFormatIdr(product.price)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-600'>{product.category}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button
                                    onClick={() => toggleFeaturedProduct(product._id)}
                                    className={`p-1 rounded-full transition-colors duration-200 ${
                                        product.isFeatured ? "bg-brown-500 text-white" : "bg-gray-200 text-gray-500"
                                    } hover:bg-brown-600`}
                                >
                                    <Star className='h-5 w-5' />
                                </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className='text-red-600 hover:text-red-800 transition-colors duration-200'
                                >
                                    <Trash className='h-5 w-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};
export default ProductsList;