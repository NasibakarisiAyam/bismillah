import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { convertAndFormatIdr } from "../utils/currency";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/analytics");
                setAnalyticsData(response.data.analyticsData);
                setDailySalesData(response.data.dailySalesData);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <AnalyticsCard
                    title='Total pengguna'
                    value={analyticsData.users.toLocaleString()}
                    icon={Users}
                    color='from-blue-500 to-indigo-700'
                />
                <AnalyticsCard
                    title='Total produk'
                    value={analyticsData.products.toLocaleString()}
                    icon={Package}
                    color='from-green-500 to-emerald-700'
                />
                <AnalyticsCard
                    title='Total penjualan'
                    value={analyticsData.totalSales.toLocaleString()}
                    icon={ShoppingCart}
                    color='from-yellow-500 to-amber-700'
                />
                <AnalyticsCard
                    title='Total pendapatan'
                    value={convertAndFormatIdr(analyticsData.totalRevenue)}
                    icon={DollarSign}
                    color='from-pink-500 to-red-700'
                />
            </div>
            <motion.div
                className='bg-white rounded-lg p-6 shadow-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <ResponsiveContainer width='100%' height={400}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#E5E7EB' />
                        <XAxis dataKey='name' stroke='#4B5563' />
                        <YAxis yAxisId='left' stroke='#4B5563' />
                        <YAxis yAxisId='right' orientation='right' stroke='#4B5563' />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#F9FAFB', border: 'none', borderRadius: '4px' }}
                            itemStyle={{ color: '#1F2937' }}
                        />
                        <Legend wrapperStyle={{ color: '#4B5563' }} />
                        <Line
                            yAxisId='left'
                            type='monotone'
                            dataKey='sales'
                            stroke='#3B82F6'
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                            name='Sales'
                        />
                        <Line
                            yAxisId='right'
                            type='monotone'
                            dataKey='revenue'
                            stroke='#10B981'
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                            name='Revenue'
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
        className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative group`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 rounded-lg`}></div>
        <div className='relative z-10 flex flex-col h-full'>
            <p className='text-white/80 text-sm font-semibold mb-2'>{title}</p>
            <h3 className='text-white text-4xl font-bold flex-1 flex items-center'>{value}</h3>
            <div className='absolute -bottom-4 -right-4 text-white/10 group-hover:text-white/20 transition-colors duration-300'>
                <Icon className='h-32 w-32' />
            </div>
        </div>
    </motion.div>
);
