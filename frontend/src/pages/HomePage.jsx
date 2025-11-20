import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import { Instagram, MessageCircle, Facebook, Twitter } from "lucide-react";
import { useSearchStore } from "../stores/useSearchStore";

const categories = [
	{ href: "/Running", name: "Running", imageUrl: "/running.jpg" },
	{ href: "/Formal", name: "Formal", imageUrl: "/formal.jpg" },
	{ href: "/Casual", name: "Casual", imageUrl: "/casual.jpg" },
	{ href: "/School", name: "School", imageUrl: "/sekolah.jpg" },
	{ href: "/Basketball", name: "Basketball", imageUrl: "/basket.jpg" },
	{ href: "/Hiking", name: "Hiking", imageUrl: "/hiking.jpeg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const { searchTerm } = useSearchStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	const filteredProducts = products.filter(prod => prod.name.toLowerCase().includes(searchTerm.toLowerCase()));
	const displayedCategories = searchTerm ? categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase())) : categories;

	return (
		<div className='relative min-h-screen text-amber-900 overflow-x-hidden'>
			
			<HeroSection />

			{/* Categories Section */}
			<div className='relative z-10 bg-gradient-to-b from-transparent via-amber-50/50 to-orange-50/50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					{/* Section Header */}
					<div className="text-center mb-12">
						<h1 className='text-5xl sm:text-6xl font-bold text-transparent bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-600 bg-clip-text mb-4'>
							Jelajahi Kategori Kami
						</h1>
						<p className='text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed'>
							Temukan kategori sepatu yang sesuai dengan lifestyle anda
						</p>
						
					
						<div className="flex items-center justify-center mt-8 mb-12">
							<div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
							<div className="w-3 h-3 bg-orange-500 rounded-full mx-4"></div>
							<div className="w-24 h-1 bg-gradient-to-l from-amber-400 to-orange-400 rounded-full"></div>
						</div>
					</div>

				
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{displayedCategories.map((category) => (
							<CategoryItem category={category} key={category.name} />
						))}
					</div>
				</div>
			</div>

			
			{!isLoading && filteredProducts.length > 5 && (
				<div className='relative z-10 bg-gradient-to-b from-orange-50/50 to-amber-50'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						{/* Featured Products Header */}
						<div className="text-center mb-12">
							<h2 className='text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-600 bg-clip-text mb-4'>
								Featured Products
							</h2>
							<p className='text-lg text-amber-700 max-w-xl mx-auto'>
								Tinggal beli apa susah sih
							</p>
						</div>

						<FeaturedProducts featuredProducts={filteredProducts.slice(5)} />
					</div>
				</div>
			)}

{/* Footer Start*/}
<div className='relative z-10 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 py-16'>
    <div className='max-w-6xl mx-auto px-6'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start gap-12'>
            <div className='lg:w-1/2'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.8254560452224!2d117.11449033840185!3d-0.5248691177683665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f540a726c0d%3A0x1028f1a62624ffcb!2sBIGmall%20Samarinda!5e0!3m2!1sid!2sid!4v1687760865997!5m2!1sid!2sid"
                    width="100%"
                    height="250"
                    style={{ border: '10px solid #92400e' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-lg"
                    title="Lokasi ShoesKarman"
                ></iframe>
                <p className='text-amber-800 mt-4 text-center font-semibold'>
                    Kunjungi juga Toko Offline Kami!
                </p>
            </div>
            <div className='lg:w-1/2 text-center lg:text-left'>
                <h3 className='text-4xl md:text-5xl font-extrabold text-amber-900 mb-6 tracking-wide'>
                    SHOESKARMAN
                </h3>
                <p className='text-lg text-amber-800 mb-8 leading-relaxed'>
                    Hubungi kami untuk mendapatkan informasi lebih lanjut tentang produk kami dan ikuti kami di media sosial.
                </p>
                <div className='flex justify-center lg:justify-start space-x-8 mb-8'>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='text-amber-700 hover:text-orange-600 transition duration-300'>
                        <Instagram size={28} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='text-amber-700 hover:text-orange-600 transition duration-300'>
                        <Facebook size={28} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className='text-amber-700 hover:text-orange-600 transition duration-300'>
                        <Twitter size={28} />
                    </a>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp" className='text-amber-700 hover:text-orange-600 transition duration-300'>
                        <MessageCircle size={28} />
                    </a>
                </div>
                <p className='text-sm text-amber-700'>
                    &copy; {new Date().getFullYear()} Saya dan kelompok saya
                </p>
            </div>
        </div>
    </div>
</div>


	</div>

		
		
	);
};

export default HomePage;
