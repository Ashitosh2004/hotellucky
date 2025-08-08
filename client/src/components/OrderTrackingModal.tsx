import React from 'react';
import { Language, Order, OrderStatus } from '@/types';
import { getTranslation } from '@/lib/translations';
import { X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useFirestore } from '@/hooks/use-firestore';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ 
  isOpen, 
  onClose, 
  language 
}) => {
  const { orders } = useFirestore();

  if (!isOpen) return null;

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'accepted':
      case 'preparing':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    return getTranslation(status === 'new' ? 'new_orders' : status, language);
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
      case 'delivered':
        return 'bg-green-200 text-green-900';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show recent orders (last 10)
  const recentOrders = orders.slice(0, 10);

  return (
    <div className="fixed inset-0 glass-dark z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-bounce-in hover-lift">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {getTranslation('my_orders', language)}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            data-testid="close-tracking-modal"
          >
            <X className="text-xl" />
          </button>
        </div>
        
        <div className="space-y-4 animate-slide-up animate-delay-200" data-testid="customer-orders">
          {recentOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-8 animate-scale-in">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">{getTranslation('no_orders_yet', language)}</p>
              <p className="text-sm">{getTranslation('orders_will_appear', language)}</p>
            </div>
          ) : (
            recentOrders.map((order, index) => (
              <div 
                key={order.id} 
                className="bg-gray-50 rounded-lg p-4 border hover-lift transition-all duration-300 animate-slide-left"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                data-testid={`order-${order.id}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{order.menuItemName}</h3>
                    <p className="text-sm text-gray-600">
                      Table {order.tableNumber} • Qty: {order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{order.totalAmount}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusText(order.status)}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Ordered: {order.createdAt.toLocaleTimeString()}</span>
                  {order.preparedAt && (
                    <span>Ready: {order.preparedAt.toLocaleTimeString()}</span>
                  )}
                </div>
                
                {order.kitchenNotes && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                    <strong>Kitchen Notes:</strong> {order.kitchenNotes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
