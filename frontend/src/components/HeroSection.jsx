import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const heroImages = [
	{
		src: "/Hero5.jpg",
		alt: "Stylish running shoes",
		title: "Naikan Pace anda",
		subtitle: "Buat lari anda menjadi lebih ringan dengan sepatu ini",
		link: "/category/Running",
	},
	{
		src: "/Hero1.jpg",
		alt: "Sepatu Formal yang elegan",
		title: "Cocok untuk anda yang ingin tampil elegan",
		subtitle: "Discover our range of formal shoes for any occasion.",
		link: "/category/Formal",
	},
	{
		src: "/Hero4.jpg",
		alt: "Sepatu kasual yang nyaman",
		title: "Cocok untuk sehari hari",
		subtitle: "Perfect for your everyday adventures.",
		link: "/category/Casual",
	},
    {
        src: "/Hero3.jpg",
		alt: "Comfortable casual shoes",
		title: "Buat lawan anda Ankle Break",
		subtitle: "Tingkatkan performa anda di lapangan",
		link: "/category/Casual",
    },
    {
        src: "/Hero2.jpg",
		alt: "Comfortable casual shoes",
		title: "Jelajahi alam yang menakjubkan",
		subtitle: "Cocok untuk seorang petualang",
		link: "/category/Casual",
    },
    {
        src: "/sekolah.jpg",
		alt: "School",
		title: "Tampil keren di sekolah",
		subtitle: "Buat anak anda semangat bersekolah",
		link: "/category/Casual",
    }
];

const HeroSectionInternal = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const handleDotClick = useCallback((i) => setIndex(i), []);

	const variants = {
		enter: {
			opacity: 0,
			scale: 1.1,
		},
		center: {
			zIndex: 1,
			opacity: 1,
			scale: 1,
		},
		exit: {
			zIndex: 0,
			opacity: 0,
			scale: 0.9,
		},
	};

	return (
		<section className="relative w-full h-screen overflow-hidden bg-cover content-center bg-center">
			<Helmet>
				{/* Preload the first hero image for faster LCP */}
				<link rel="preload" as="image" href={heroImages[0].src} />
			</Helmet>

			<AnimatePresence initial={false}>
				<motion.div
					key={index}
					className="absolute inset-0 w-full h-full"
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						opacity: { duration: 0.8 },
						scale: { duration: 1.2 },
					}}
				>
					<img 
						src={heroImages[index].src} 
						alt={heroImages[index].alt} 
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
				</motion.div>
			</AnimatePresence>
			
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative z-10 text-center text-white px-4 max-w-4xl">
					<motion.h1 
						key={`title-${index}`} 
						initial={{ opacity: 0, y: -50 }} 
						animate={{ opacity: 1, y: 0 }} 
						transition={{ duration: 0.8, delay: 0.3 }} 
						className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4"
						style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
					>
						{heroImages[index].title}
					</motion.h1>
					
					<motion.p 
						key={`subtitle-${index}`} 
						initial={{ opacity: 0, y: 50 }} 
						animate={{ opacity: 1, y: 0 }} 
						transition={{ duration: 0.8, delay: 0.5 }} 
						className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto"
					>
						{heroImages[index].subtitle}
					</motion.p>
					
					<motion.div 
						key={`button-${index}`} 
						initial={{ opacity: 0, scale: 0.8 }} 
						animate={{ opacity: 1, scale: 1 }} 
						transition={{ duration: 0.8, delay: 0.7 }}
					>
						<Link 
							to={heroImages[index].link} 
							className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
						>
							Belanja Sekarang
						</Link>
					</motion.div>
				</div>
			</div>

			{/* Navigation dots */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
				{heroImages.map((_, i) => (
					<button
						key={i}
						onClick={() => handleDotClick(i)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
						}`}
					/>
				))}
			</div>
		</section>
	);
};

const HeroSection = memo(HeroSectionInternal);

export default HeroSection;
