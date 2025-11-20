import { create } from "zustand";
import axios from "axios";

export const useSearchStore = create((set) => ({
	searchTerm: "",
	searchResults: [],
	setSearchTerm: (term) => set({ searchTerm: term }),
	fetchSearchResults: async (query, sortBy = null, sortOrder = null) => {
		if (!query) {
			set({ searchResults: [] });
			return;
		}
		try {
			let url = `/api/products/search?q=${encodeURIComponent(query)}`;
			if (sortBy) {
				url += `&sortBy=${sortBy}`;
			}
			if (sortOrder) {
				url += `&sortOrder=${sortOrder}`;
			}
			const response = await axios.get(url);
			set({ searchResults: response.data.products });
		} catch (error) {
			console.error("Failed to fetch search results", error);
			set({ searchResults: [] });
		}
	},
}));
