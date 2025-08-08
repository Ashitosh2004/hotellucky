import React, { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Settings, LogOut, Receipt, DollarSign, Clock, TrendingUp, Plus, List, BarChart3 } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AddMenuItemModal } from './AddMenuItemModal';
import { useFirestore } from '@/hooks/use-firestore';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from './Notification';

interface AdminDashboardProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  language, 
  onLanguageChange, 
  onLogout 
}) => {
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const { orders, menuItems, getTodayStats } = useFirestore();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const stats = getTodayStats();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      showNotification('Logout failed', 'error');
    }
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      {/* Admin Navigation */}
      <nav className="glass-effect shadow-lg border-b sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-left">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center animate-glow">
                <Settings className="text-white" size={20} />
              </div>
              <h1 className="ml-3 text-xl font-bold gradient-text">
                {getTranslation('admin_dashboard', language)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
              />
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
                data-testid="admin-logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center animate-glow">
                <Receipt className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">{getTranslation('todays_orders', language)}</p>
                <p className="text-2xl font-bold text-gray-800">{stats.todayOrders}</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center animate-glow">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">{getTranslation('todays_revenue', language)}</p>
                <p className="text-2xl font-bold text-gray-800">₹{stats.todayRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center animate-glow">
                <Clock className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">{getTranslation('avg_prep_time', language)}</p>
                <p className="text-2xl font-bold text-gray-800">{stats.avgPrepTime} min</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-400">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center animate-glow">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">{getTranslation('growth', language)}</p>
                <p className="text-2xl font-bold text-gray-800">+12%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up animate-delay-200">
          <button 
            onClick={() => setShowAddMenuModal(true)}
            className="card-modern rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left hover-lift btn-modern animate-scale-in animate-delay-300"
            data-testid="add-menu-item-btn"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center animate-glow">
                <Plus className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {getTranslation('add_menu_item', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('add_new_dishes', language)}
                </p>
              </div>
            </div>
          </button>

          <button 
            className="card-modern rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-left hover-lift btn-modern animate-scale-in animate-delay-400"
            data-testid="view-all-orders-btn"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center animate-glow">
                <List className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {getTranslation('view_all_orders', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('monitor_orders', language)}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Orders and Menu Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent orders</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.menuItemName}</p>
                      <p className="text-sm text-gray-600">Table {order.tableNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{order.totalAmount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Menu Stats */}
          <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Menu Items</span>
                <span className="font-bold text-xl">{menuItems.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">South Indian Items</span>
                <span className="font-bold text-xl">
                  {menuItems.filter(item => item.category === 'south-indian').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Kolhapuri Items</span>
                <span className="font-bold text-xl">
                  {menuItems.filter(item => item.category === 'kolhapuri').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Items</span>
                <span className="font-bold text-xl">
                  {menuItems.filter(item => item.isAvailable).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="card-modern rounded-xl shadow-lg p-6 animate-scale-in hover-lift animate-delay-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Sales Overview</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Sales Chart</p>
              <p className="text-sm">Real-time analytics from Firebase data</p>
              <p className="text-xs mt-2">Chart implementation can be added with recharts</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Menu Item Modal */}
      <AddMenuItemModal
        isOpen={showAddMenuModal}
        onClose={() => setShowAddMenuModal(false)}
        language={language}
      />
    </div>
  );
};
