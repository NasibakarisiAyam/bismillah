import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data.user || res.data, loading: false });
			toast.success("Account created successfully!");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });
			set({ user: res.data.user || res.data, loading: false });
			toast.success("Logged in successfully!");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
			toast.success("Logged out successfully!");
		} catch (error) {
			set({ user: null });
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data.user || response.data, checkingAuth: false });
		} catch (error) {
			// Jangan log error 401, karena itu normal untuk user yang belum login
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		
		// Jangan intercept untuk endpoint auth atau profile check pertama kali
		const skipInterceptEndpoints = [
			'/auth/login',
			'/auth/signup', 
			'/auth/refresh-token',
			'/auth/logout',
			'/auth/profile' // Skip profile check agar tidak loop
		];
		
		const shouldSkip = skipInterceptEndpoints.some(endpoint => 
			originalRequest.url?.includes(endpoint)
		);
		
		if (error.response?.status === 401 && !originalRequest._retry && !shouldSkip) {
			originalRequest._retry = true;

			try {
				if (refreshPromise) {
					await refreshPromise;
					refreshPromise = null;
					return axios(originalRequest);
				}

				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				refreshPromise = null;
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);