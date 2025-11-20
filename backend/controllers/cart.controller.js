import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: req.user.cartItems.filter(item => item.product).map(item => item.product) } });

		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.product && cartItem.product.toString() === product._id.toString());
			return { ...product.toJSON(), quantity: item.quantity, selectedSize: item.selectedSize, selectedColor: item.selectedColor };
		});

		res.json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { productId, selectedSize, selectedColor } = req.body;
		if (!productId) {
			return res.status(400).json({ message: "productId is required" });
		}
		const user = req.user;

		const existingItem = user.cartItems.find(
			(item) =>
				item.product && item.product.toString() === productId &&
				item.selectedSize === (selectedSize || null) &&
				item.selectedColor === (selectedColor || null)
		);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push({ product: productId, selectedSize: selectedSize || null, selectedColor: selectedColor || null, quantity: 1 });
		}

		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId, selectedSize, selectedColor } = req.body;
		const user = req.user;
		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) =>
				!(item.product && item.product.toString() === productId &&
				  item.selectedSize === (selectedSize || null) &&
				  item.selectedColor === (selectedColor || null))
			);
		}
		await user.save();
		res.json(user.cartItems);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity, selectedSize, selectedColor } = req.body;
		const user = req.user;
		const existingItem = user.cartItems.find((item) => item.product && item.product.toString() === productId && item.selectedSize === (selectedSize || null) && item.selectedColor === (selectedColor || null));

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => !(item.product && item.product.toString() === productId && item.selectedSize === (selectedSize || null) && item.selectedColor === (selectedColor || null)));
				await user.save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
