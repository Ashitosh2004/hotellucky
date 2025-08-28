import React, { useMemo } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { useFirestore } from '@/hooks/use-firestore';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface EarningsChartProps {
  language: Language;
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ language }) => {
  const { orders } = useFirestore();

  const analytics = useMemo(() => {
    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter delivered orders only
    const deliveredOrders = orders.filter(order => order.status === 'delivered');

    // Weekly data (last 7 days)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + (6 - i));
      
      const dayOrders = deliveredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === date.toDateString();
      });
      
      const dayEarnings = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      weeklyData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString(),
        earnings: dayEarnings,
        orders: dayOrders.length
      });
    }

    // Monthly data (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const monthOrders = deliveredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= date && orderDate < nextMonth;
      });
      
      const monthEarnings = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date.toLocaleDateString(),
        earnings: monthEarnings,
        orders: monthOrders.length
      });
    }

    const totalWeeklyEarnings = weeklyData.reduce((sum, day) => sum + day.earnings, 0);
    const totalMonthlyEarnings = monthlyData[monthlyData.length - 1]?.earnings || 0;
    const maxWeeklyEarning = Math.max(...weeklyData.map(d => d.earnings));
    const maxMonthlyEarning = Math.max(...monthlyData.map(d => d.earnings));

    return {
      weeklyData,
      monthlyData,
      totalWeeklyEarnings,
      totalMonthlyEarnings,
      maxWeeklyEarning,
      maxMonthlyEarning
    };
  }, [orders]);

  const BarChart = ({ data, maxValue, type }: { data: any[], maxValue: number, type: 'weekly' | 'monthly' }) => (
    <div className="flex items-end justify-between h-32 space-x-1 bg-gray-50 rounded-lg p-3">
      {data.map((item, index) => {
        const height = maxValue > 0 ? (item.earnings / maxValue) * 100 : 0;
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-sm hover:from-orange-600 hover:to-orange-500 transition-all duration-300 relative group"
              style={{ height: `${Math.max(height, 2)}%` }}
              data-testid={`bar-${type}-${index}`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ₹{item.earnings}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">
              {type === 'weekly' ? item.day : item.month}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-modern rounded-xl p-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">This Week</p>
              <p className="text-2xl font-bold text-blue-800">₹{analytics.totalWeeklyEarnings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="text-white" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card-modern rounded-xl p-4 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">This Month</p>
              <p className="text-2xl font-bold text-green-800">₹{analytics.totalMonthlyEarnings}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="text-orange-500 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Weekly Earnings (Last 7 Days)</h3>
        </div>
        <BarChart 
          data={analytics.weeklyData} 
          maxValue={analytics.maxWeeklyEarning} 
          type="weekly"
        />
        <div className="mt-4 grid grid-cols-7 gap-1 text-xs text-gray-500">
          {analytics.weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">₹{day.earnings}</div>
              <div>{day.orders} orders</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <DollarSign className="text-green-500 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Monthly Earnings (Last 6 Months)</h3>
        </div>
        <BarChart 
          data={analytics.monthlyData} 
          maxValue={analytics.maxMonthlyEarning} 
          type="monthly"
        />
        <div className="mt-4 grid grid-cols-6 gap-1 text-xs text-gray-500">
          {analytics.monthlyData.map((month, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">₹{month.earnings}</div>
              <div>{month.orders} orders</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};