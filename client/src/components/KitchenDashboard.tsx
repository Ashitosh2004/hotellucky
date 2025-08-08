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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center animate-slide-left">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center animate-glow">
                <KitchenIcon className="text-white" size={20} />
              </div>
              <h1 className="ml-3 text-xl font-bold gradient-text">
                {getTranslation('kitchen_dashboard', language)}
              </h1>
              <span className="ml-4 px-3 py-1 bg-orange-500 text-white text-sm rounded-full animate-bounce-in animate-delay-200">
                {getKitchenTitle()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
              />
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
                data-testid="kitchen-logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Kitchen Orders */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 animate-slide-up">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            {getTranslation('active_orders', language)}
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in animate-delay-200">Manage incoming orders for your kitchen</p>
        </div>

        {/* Order Status Filters */}
        <div className="mb-6 animate-slide-up animate-delay-200">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {(['all', 'new', 'preparing', 'ready'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 btn-modern hover-lift ${
                  statusFilter === status
                    ? 'bg-orange-500 text-white animate-glow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                data-testid={`status-filter-${status}`}
              >
                {status === 'all' ? 'All Orders' : getTranslation(status === 'new' ? 'new_orders' : status, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animate-delay-300" data-testid="kitchen-orders">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400">Orders will appear here when customers place them</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div 
                key={order.id}
                className="card-modern rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover-lift animate-scale-in"
                data-testid={`order-card-${order.id}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{order.menuItemName}</h3>
                    <p className="text-sm text-gray-600">
                      Table {order.tableNumber} • Qty: {order.quantity}
                    </p>
                    <p className="text-lg font-bold text-orange-500">₹{order.totalAmount}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{getTranslation(order.status === 'new' ? 'new_orders' : order.status, language)}</span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <p>Ordered: {order.createdAt.toLocaleString()}</p>
                  {order.acceptedAt && (
                    <p>Accepted: {order.acceptedAt.toLocaleString()}</p>
                  )}
                </div>

                {order.customerNotes && (
                  <div className="mb-4 p-2 bg-blue-50 rounded text-sm">
                    <strong>Customer Notes:</strong> {order.customerNotes}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {order.status === 'new' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'accepted')}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-all duration-300 btn-modern hover-lift"
                        data-testid={`accept-order-${order.id}`}
                      >
                        {getTranslation('accept', language)}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'rejected')}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-all duration-300 btn-modern hover-lift"
                        data-testid={`reject-order-${order.id}`}
                      >
                        {getTranslation('reject', language)}
                      </button>
                    </>
                  )}
                  
                  {order.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'preparing')}
                      className="w-full bg-orange-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-orange-600 transition-all duration-300 btn-modern hover-lift animate-glow"
                      data-testid={`start-preparing-${order.id}`}
                    >
                      Start {getTranslation('preparing', language)}
                    </button>
                  )}
                  
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'ready')}
                      className="w-full bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-all duration-300 btn-modern hover-lift animate-glow"
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
