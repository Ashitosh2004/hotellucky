import React, { useState } from 'react';
import { Language, MenuCategory } from '@/types';
import { getTranslation } from '@/lib/translations';
import { X, Loader2, Upload } from 'lucide-react';
import { useFirestore } from '@/hooks/use-firestore';
import { useNotification } from './Notification';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({ 
  isOpen, 
  onClose, 
  language 
}) => {
  const [formData, setFormData] = useState({
    nameEn: '',
    nameHi: '',
    nameMr: '',
    descEn: '',
    descHi: '',
    descMr: '',
    price: '',
    category: 'south-indian' as MenuCategory
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { addMenuItem } = useFirestore();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameEn || !formData.price) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const menuItem = {
        name: {
          en: formData.nameEn,
          hi: formData.nameHi || formData.nameEn,
          mr: formData.nameMr || formData.nameEn
        },
        description: {
          en: formData.descEn,
          hi: formData.descHi || formData.descEn,
          mr: formData.descMr || formData.descEn
        },
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: '',
        isAvailable: true
      };

      await addMenuItem(menuItem, imageFile || undefined);
      
      showNotification('Menu item added successfully!', 'success');
      onClose();
      resetForm();
    } catch (error) {
      showNotification('Failed to add menu item. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nameEn: '',
      nameHi: '',
      nameMr: '',
      descEn: '',
      descHi: '',
      descMr: '',
      price: '',
      category: 'south-indian'
    });
    setImageFile(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 glass-dark z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in hover-lift">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {getTranslation('add_menu_item', language)}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            data-testid="close-add-menu-modal"
          >
            <X className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up animate-delay-200">
          {/* English Name */}
          <div className="animate-slide-left animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('item_name', language)} (English) *
            </label>
            <input 
              type="text" 
              value={formData.nameEn}
              onChange={(e) => handleInputChange('nameEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="Enter item name"
              required
              data-testid="item-name-en"
            />
          </div>

          {/* Hindi Name */}
          <div className="animate-slide-right animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('item_name', language)} (Hindi)
            </label>
            <input 
              type="text" 
              value={formData.nameHi}
              onChange={(e) => handleInputChange('nameHi', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="हिंदी नाम दर्ज करें"
              data-testid="item-name-hi"
            />
          </div>

          {/* Marathi Name */}
          <div className="animate-slide-left animate-delay-500">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('item_name', language)} (Marathi)
            </label>
            <input 
              type="text" 
              value={formData.nameMr}
              onChange={(e) => handleInputChange('nameMr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="मराठी नाव टाका"
              data-testid="item-name-mr"
            />
          </div>

          {/* English Description */}
          <div className="animate-slide-right animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('description', language)} (English)
            </label>
            <textarea 
              value={formData.descEn}
              onChange={(e) => handleInputChange('descEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              rows={3} 
              placeholder="Enter description"
              data-testid="item-desc-en"
            />
          </div>

          {/* Price */}
          <div className="animate-slide-left animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('price', language)} (₹) *
            </label>
            <input 
              type="number" 
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="Enter price" 
              min="1"
              required
              data-testid="item-price"
            />
          </div>

          {/* Category */}
          <div className="animate-slide-right animate-delay-500">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('category', language)}
            </label>
            <select 
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              data-testid="item-category"
            >
              <option value="south-indian">{getTranslation('south_indian', language)}</option>
              <option value="kolhapuri">{getTranslation('kolhapuri', language)}</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="animate-scale-in animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('image', language)}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input 
                type="file" 
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden" 
                accept="image/*"
                id="image-upload"
                data-testid="item-image"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {imageFile ? imageFile.name : 'Click to upload image'}
                </p>
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 btn-modern hover-lift"
              data-testid="cancel-add-menu"
            >
              {getTranslation('cancel', language)}
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center btn-modern hover-lift animate-glow"
              data-testid="submit-menu-item"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {getTranslation('loading', language)}
                </>
              ) : (
                getTranslation('add_item', language)
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
