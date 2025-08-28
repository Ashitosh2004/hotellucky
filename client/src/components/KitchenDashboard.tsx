import React, { useState } from 'react';
import { Language, UserRole, Order, OrderStatus } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Flame, CookingPot, LogOut, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useFirestore } from '@/hooks/use-firestore';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from './Notification';

interface KitchenDashboardProps {
  role: UserRole;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onLogout: () => void;
}

export const KitchenDashboard: React.FC<KitchenDashboardProps> = ({ 
  role, 
  language, 
  onLanguageChange, 
  onLogout 
}) => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const { orders, updateOrderStatus } = useFirestore();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  // Filter orders by kitchen type
  const kitchenCategory = role === 'south-kitchen' ? 'south-indian' : 'kolhapuri';
  const kitchenOrders = orders.filter(order => order.category === kitchenCategory);

  // Apply status filter
  const filteredOrders = statusFilter === 'all' 
    ? kitchenOrders 
    : kitchenOrders.filter(order => order.status === statusFilter);

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      showNotification(`Order ${status} successfully!`, 'success');
    } catch (error) {
      showNotification('Failed to update order status', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      showNotification('Logout failed', 'error');
    }
  };

  const getKitchenIcon = () => {
    return role === 'south-kitchen' ? CookingPot : Flame;
  };

  const getKitchenTitle = () => {
    return role === 'south-kitchen' 
      ? getTranslation('south_indian_kitchen', language)
      : getTranslation('kolhapuri_kitchen', language);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'accepted':
      case 'preparing':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const KitchenIcon = getKitchenIcon();

  return (
    <div>
      {/* Kitchen Navigation */}
      <nav className="glass-effect shadow-lg border-b sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center animate-slide-left overflow-hidden">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center animate-glow flex-shrink-0">
                <KitchenIcon className="text-white" size={16} />
              </div>
              <h1 className="ml-2 sm:ml-3 text-base sm:text-xl font-bold gradient-text hidden sm:block">
                {getTranslation('kitchen_dashboard', language)}
              </h1>
              <h1 className="ml-2 text-sm font-bold gradient-text sm:hidden">
                Kitchen
              </h1>
              <span className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 bg-orange-500 text-white text-xs sm:text-sm rounded-full animate-bounce-in animate-delay-200 truncate">
                {role === 'south-kitchen' ? 'South' : 'Kolhapuri'}
              </span>
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
                data-testid="kitchen-logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Kitchen Orders */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
            {getTranslation('active_orders', language)}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 animate-fade-in animate-delay-200">Manage incoming orders for your kitchen</p>
        </div>

        {/* Order Status Filters */}
        <div className="mb-4 sm:mb-6 animate-slide-up animate-delay-200">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {(['all', 'new', 'preparing', 'ready'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 btn-modern hover-lift text-sm sm:text-base ${
                  statusFilter === status
                    ? 'bg-orange-500 text-white animate-glow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                data-testid={`status-filter-${status}`}
              >
                {status === 'all' ? getTranslation('all_orders', language) : getTranslation(status === 'new' ? 'new_orders' : status, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in animate-delay-300" data-testid="kitchen-orders">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-8 sm:py-12">
              <Clock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-base sm:text-lg">{getTranslation('no_orders_found', language)}</p>
              <p className="text-gray-400 text-sm sm:text-base">{getTranslation('orders_appear_kitchen', language)}</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="card-modern rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-orange-500 hover-lift animate-scale-in"
                data-testid={`order-card-${order.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="mb-2 sm:mb-0 flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg mb-1 truncate">{order.menuItemName}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {getTranslation('table', language)} {order.tableNumber} • {getTranslation('qty', language)}: {order.quantity}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-orange-500">₹{order.totalAmount}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium self-start sm:ml-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{getTranslation(order.status === 'new' ? 'new_orders' : order.status, language)}</span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-3 sm:mb-4">
                  <p className="truncate">{getTranslation('ordered_time', language)}: {order.createdAt.toLocaleString()}</p>
                  {order.acceptedAt && (
                    <p className="truncate">{getTranslation('accepted_time', language)}: {order.acceptedAt.toLocaleString()}</p>
                  )}
                </div>

                {order.customerNotes && (
                  <div className="mb-3 sm:mb-4 p-2 bg-blue-50 rounded text-xs sm:text-sm">
                    <strong>{getTranslation('customer_notes', language)}:</strong> {order.customerNotes}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  {order.status === 'new' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'accepted')}
                        className="flex-1 bg-green-500 text-white py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm hover:bg-green-600 transition-all duration-300 btn-modern hover-lift"
                        data-testid={`accept-order-${order.id}`}
                      >
                        {getTranslation('accept', language)}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'rejected')}
                        className="flex-1 bg-red-500 text-white py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition-all duration-300 btn-modern hover-lift"
                        data-testid={`reject-order-${order.id}`}
                      >
                        {getTranslation('reject', language)}
                      </button>
                    </>
                  )}
                  
                  {order.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'preparing')}
                      className="w-full bg-orange-500 text-white py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm hover:bg-orange-600 transition-all duration-300 btn-modern hover-lift animate-glow"
                      data-testid={`start-preparing-${order.id}`}
                    >
                      Start {getTranslation('preparing', language)}
                    </button>
                  )}
                  
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'ready')}
                      className="w-full bg-green-500 text-white py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm hover:bg-green-600 transition-all duration-300 btn-modern hover-lift animate-glow"
                      data-testid={`mark-ready-${order.id}`}
                    >
                      {getTranslation('mark_ready', language)}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
