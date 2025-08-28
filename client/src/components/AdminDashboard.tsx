import React, { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Settings, LogOut, Receipt, DollarSign, Clock, TrendingUp, Plus, List, BarChart3, Trash2, QrCode, Edit3 } from 'lucide-react';
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
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const { orders, menuItems, getTodayStats, deleteMenuItem, updateQrCode, qrCodeUrl } = useFirestore();
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

  const handleDeleteMenuItem = async (itemId: string, itemName: any) => {
    if (window.confirm(`Are you sure you want to delete "${typeof itemName === 'object' ? itemName.en : itemName}"?`)) {
      try {
        await deleteMenuItem(itemId);
        showNotification('Menu item deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete menu item', 'error');
      }
    }
  };

  const handleUpdateQr = async () => {
    if (!qrUrl.trim()) {
      showNotification('Please enter a valid QR code URL', 'error');
      return;
    }
    try {
      await updateQrCode(qrUrl);
      showNotification('QR code updated successfully', 'success');
      setShowQrModal(false);
      setQrUrl('');
    } catch (error) {
      showNotification('Failed to update QR code', 'error');
    }
  };

  return (
    <div>
      {/* Admin Navigation */}
      <nav className="glass-effect shadow-lg border-b sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center animate-slide-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center animate-glow">
                <Settings className="text-white" size={16} />
              </div>
              <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold gradient-text">
                {getTranslation('admin_dashboard', language)}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <LanguageSwitcher
                  currentLanguage={language}
                  onLanguageChange={onLanguageChange}
                />
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 p-2"
                data-testid="admin-logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8 animate-slide-up">
          <div className="card-modern rounded-xl shadow-lg p-3 sm:p-6 animate-scale-in hover-lift animate-delay-100">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center animate-glow mb-2 sm:mb-0">
                <Receipt className="text-white" size={20} />
              </div>
              <div className="sm:ml-4 text-center sm:text-left">
                <p className="text-gray-600 text-xs sm:text-sm">{getTranslation('todays_orders', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.todayOrders}</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-3 sm:p-6 animate-scale-in hover-lift animate-delay-200">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center animate-glow mb-2 sm:mb-0">
                <DollarSign className="text-white" size={20} />
              </div>
              <div className="sm:ml-4 text-center sm:text-left">
                <p className="text-gray-600 text-xs sm:text-sm">{getTranslation('todays_revenue', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">₹{stats.todayRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-3 sm:p-6 animate-scale-in hover-lift animate-delay-300">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center animate-glow mb-2 sm:mb-0">
                <Clock className="text-white" size={20} />
              </div>
              <div className="sm:ml-4 text-center sm:text-left">
                <p className="text-gray-600 text-xs sm:text-sm">{getTranslation('avg_prep_time', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.avgPrepTime} min</p>
              </div>
            </div>
          </div>

          <div className="card-modern rounded-xl shadow-lg p-3 sm:p-6 animate-scale-in hover-lift animate-delay-400">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center animate-glow mb-2 sm:mb-0">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div className="sm:ml-4 text-center sm:text-left">
                <p className="text-gray-600 text-xs sm:text-sm">{getTranslation('growth', language)}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">+12%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 animate-slide-up animate-delay-200">
          <button 
            onClick={() => setShowAddMenuModal(true)}
            className="card-modern rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 text-left hover-lift btn-modern animate-scale-in animate-delay-300"
            data-testid="add-menu-item-btn"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center animate-glow flex-shrink-0">
                <Plus className="text-white" size={20} />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {getTranslation('add_menu_item', language)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {getTranslation('add_new_dishes', language)}
                </p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => {
              setQrUrl(qrCodeUrl);
              setShowQrModal(true);
            }}
            className="card-modern rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 text-left hover-lift btn-modern animate-scale-in animate-delay-400"
            data-testid="edit-qr-btn"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center animate-glow flex-shrink-0">
                <QrCode className="text-white" size={20} />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Edit QR Code
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Update payment QR code
                </p>
              </div>
            </div>
          </button>

          <button 
            className="card-modern rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 text-left hover-lift btn-modern animate-scale-in animate-delay-500"
            data-testid="view-all-orders-btn"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center animate-glow flex-shrink-0">
                <List className="text-white" size={20} />
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {getTranslation('view_all_orders', language)}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {getTranslation('monitor_orders', language)}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Menu Management */}
        <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-scale-in hover-lift animate-delay-300">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Menu Management</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {menuItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">No menu items</p>
            ) : (
              menuItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {typeof item.name === 'object' ? item.name.en : item.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      ₹{item.price} - {item.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    <button
                      onClick={() => handleDeleteMenuItem(item.id, item.name)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      data-testid={`delete-item-${item.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders and Menu Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Orders */}
          <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6 animate-scale-in hover-lift animate-delay-400">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">No recent orders</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{order.menuItemName}</p>
                      <p className="text-xs sm:text-sm text-gray-600">Table {order.tableNumber}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-bold text-sm sm:text-base">₹{order.totalAmount}</p>
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
          <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6 animate-scale-in hover-lift animate-delay-500">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Menu Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Total Menu Items</span>
                <span className="font-bold text-lg sm:text-xl">{menuItems.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">South Indian Items</span>
                <span className="font-bold text-lg sm:text-xl">
                  {menuItems.filter(item => item.category === 'south-indian').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Kolhapuri Items</span>
                <span className="font-bold text-lg sm:text-xl">
                  {menuItems.filter(item => item.category === 'kolhapuri').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm sm:text-base">Available Items</span>
                <span className="font-bold text-lg sm:text-xl">
                  {menuItems.filter(item => item.isAvailable).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart Placeholder */}
        <div className="card-modern rounded-xl shadow-lg p-4 sm:p-6 animate-scale-in hover-lift animate-delay-500">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Daily Sales Overview</h3>
          <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500 p-4">
              <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-base sm:text-lg">Sales Chart</p>
              <p className="text-xs sm:text-sm">Real-time analytics from Firebase data</p>
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

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Payment QR Code</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Image URL
                </label>
                <input
                  type="url"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  placeholder="https://example.com/qr-code.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  data-testid="qr-url-input"
                />
              </div>
              {qrUrl && (
                <div className="flex justify-center">
                  <img 
                    src={qrUrl} 
                    alt="QR Code Preview" 
                    className="max-w-48 max-h-48 rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowQrModal(false);
                  setQrUrl('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                data-testid="qr-cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQr}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                data-testid="qr-save-btn"
              >
                Save QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
