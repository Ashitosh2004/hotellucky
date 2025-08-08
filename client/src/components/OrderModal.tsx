import React, { useState } from 'react';
import { Language, MenuItem } from '@/types';
import { getTranslation } from '@/lib/translations';
import { X, Plus, Minus, Loader2 } from 'lucide-react';
import { useFirestore } from '@/hooks/use-firestore';
import { useNotification } from './Notification';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  language: Language;
}

export const OrderModal: React.FC<OrderModalProps> = ({ 
  isOpen, 
  onClose, 
  menuItem, 
  language 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { addOrder } = useFirestore();
  const { showNotification } = useNotification();

  if (!isOpen || !menuItem) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tableNumber.trim()) {
      showNotification(getTranslation('please_enter_table', language), 'error');
      return;
    }

    setLoading(true);
    
    try {
      await addOrder({
        menuItemId: menuItem.id,
        menuItemName: menuItem.name[language],
        quantity,
        tableNumber: parseInt(tableNumber),
        status: 'new',
        category: menuItem.category,
        price: menuItem.price,
        totalAmount: menuItem.price * quantity
      });

      showNotification(
        `${getTranslation('order_placed', language)} Table ${tableNumber}!`, 
        'success'
      );
      onClose();
      resetForm();
    } catch (error) {
      showNotification('Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setQuantity(1);
    setTableNumber('');
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 glass-dark z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-6 max-w-md w-full animate-bounce-in hover-lift">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {getTranslation('place_order', language)}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            data-testid="close-order-modal"
          >
            <X className="text-xl" />
          </button>
        </div>
        
        {/* Item Details */}
        <div className="mb-6 animate-scale-in animate-delay-200">
          <div className="flex items-center space-x-4">
            <img 
              src={menuItem.imageUrl} 
              alt={menuItem.name[language]} 
              className="w-16 h-16 rounded-lg object-cover" 
            />
            <div>
              <h3 className="font-semibold text-lg">{menuItem.name[language]}</h3>
              <p className="text-orange-500 font-bold">₹{menuItem.price}</p>
              <p className="text-sm text-gray-600">{menuItem.description[language]}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Quantity */}
          <div className="mb-4 animate-slide-left animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('quantity', language)}
            </label>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={decreaseQuantity}
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-all duration-300 btn-modern hover-lift"
                data-testid="quantity-decrease"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold w-8 text-center" data-testid="quantity-display">
                {quantity}
              </span>
              <button 
                type="button"
                onClick={increaseQuantity}
                className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-all duration-300 btn-modern hover-lift"
                data-testid="quantity-increase"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Table Number */}
          <div className="mb-6 animate-slide-right animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('table_number', language)}
            </label>
            <input 
              type="number" 
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300" 
              placeholder={getTranslation('enter_table_number', language)} 
              min="1" 
              max="50"
              required
              data-testid="table-number"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 btn-modern hover-lift"
              data-testid="cancel-order"
            >
              {getTranslation('cancel', language)}
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center btn-modern hover-lift animate-glow"
              data-testid="confirm-order"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {getTranslation('loading', language)}
                </>
              ) : (
                getTranslation('confirm_order', language)
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
