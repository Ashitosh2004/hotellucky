import React, { useState, useEffect } from 'react';
import { Language, MenuItem, MenuCategory } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Utensils, Receipt, LogOut, QrCode } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { OrderModal } from './OrderModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { CustomerLogoutModal } from './CustomerLogoutModal';
import { useFirestore } from '@/hooks/use-firestore';

interface CustomerMenuProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onLogout?: () => void;
}

export const CustomerMenu: React.FC<CustomerMenuProps> = ({ 
  language, 
  onLanguageChange,
  onLogout 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const { menuItems, orders, qrCodeUrl } = useFirestore();

  // Get active orders count for current session
  const activeOrdersCount = orders.filter(order => 
    order.status !== 'delivered' && order.status !== 'rejected'
  ).length;

  const filteredMenuItems = menuItems.filter(item => {
    if (selectedCategory === 'all') return item.isAvailable;
    return item.category === selectedCategory && item.isAvailable;
  });

  const handleOrderClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setShowOrderModal(true);
  };

  return (
    <div>
      {/* Navigation Header */}
      <nav className="glass-effect shadow-lg border-b sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center animate-slide-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center animate-glow">
                <Utensils className="text-white" size={16} />
              </div>
              <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold gradient-text">
                {getTranslation('hotel_lucky', language)}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
              />
              {qrCodeUrl && (
                <button 
                  onClick={() => setShowQrModal(true)}
                  className="bg-blue-500 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 btn-modern hover-lift text-xs sm:text-sm"
                  data-testid="show-qr-btn"
                >
                  <QrCode className="mr-1 sm:mr-2" size={14} />
                  <span className="hidden sm:inline">Payment QR</span>
                  <span className="sm:hidden">QR</span>
                </button>
              )}
              <button 
                onClick={() => setShowTrackingModal(true)}
                className="relative bg-orange-500 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 btn-modern hover-lift text-xs sm:text-sm"
                data-testid="order-tracking-btn"
              >
                <Receipt className="mr-1 sm:mr-2" size={14} />
                <span className="hidden sm:inline">{getTranslation('my_orders', language)}</span>
                <span className="sm:hidden">Orders</span>
                {activeOrdersCount > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    data-testid="order-count"
                  >
                    {activeOrdersCount}
                  </span>
                )}
              </button>
              {onLogout && (
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 btn-modern hover-lift text-xs sm:text-sm"
                  data-testid="customer-logout-btn"
                >
                  <LogOut className="mr-1 sm:mr-2" size={14} />
                  <span className="hidden sm:inline">{getTranslation('logout', language)}</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-6 sm:mb-8 animate-bounce-in px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 sm:mb-4">
            {getTranslation('welcome_message', language)}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 animate-fade-in animate-delay-300">
            {getTranslation('menu_subtitle', language)}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8 animate-slide-up animate-delay-200">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 px-4 sm:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 btn-modern hover-lift text-sm sm:text-base ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white animate-glow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="category-all"
            >
              {getTranslation('all_items', language)}
            </button>
            <button
              onClick={() => setSelectedCategory('south-indian')}
              className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 btn-modern hover-lift text-sm sm:text-base ${
                selectedCategory === 'south-indian'
                  ? 'bg-orange-500 text-white animate-glow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="category-south-indian"
            >
              {getTranslation('south_indian', language)}
            </button>
            <button
              onClick={() => setSelectedCategory('kolhapuri')}
              className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 btn-modern hover-lift text-sm sm:text-base ${
                selectedCategory === 'kolhapuri'
                  ? 'bg-orange-500 text-white animate-glow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="category-kolhapuri"
            >
              {getTranslation('kolhapuri', language)}
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-in animate-delay-300 px-4 sm:px-0">
          {filteredMenuItems.map((item) => (
            <div 
              key={item.id}
              className="card-modern rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift animate-scale-in"
              data-testid={`menu-item-${item.id}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.name[language]} 
                className="w-full h-40 sm:h-48 object-cover" 
              />
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2">{item.name[language]}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{item.description[language]}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 font-bold text-base sm:text-lg">₹{item.price}</span>
                  <button 
                    onClick={() => handleOrderClick(item)}
                    className="bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 btn-modern hover-lift text-xs sm:text-sm"
                    data-testid={`order-btn-${item.id}`}
                  >
                    {getTranslation('order_now', language)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <Utensils className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-base sm:text-lg">No items available in this category</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        menuItem={selectedMenuItem}
        language={language}
      />

      <OrderTrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        language={language}
      />

      <CustomerLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={() => {
          if (onLogout) {
            onLogout();
          }
        }}
        language={language}
      />

      {/* QR Code Modal */}
      {showQrModal && qrCodeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Payment QR Code</h3>
            <div className="flex justify-center mb-4">
              <img 
                src={qrCodeUrl} 
                alt="Payment QR Code" 
                className="max-w-full max-h-80 rounded-lg border shadow-lg"
                data-testid="qr-code-image"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">
              Scan this QR code to make payment
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowQrModal(false)}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                data-testid="qr-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
