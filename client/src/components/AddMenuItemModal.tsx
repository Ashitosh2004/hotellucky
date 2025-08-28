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
    category: 'south-indian' as MenuCategory,
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { addMenuItem } = useFirestore();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameEn || !formData.price) {
      showNotification(getTranslation('fill_required_fields', language), 'error');
      return;
    }

    if (formData.imageUrl && !isValidImageUrl(formData.imageUrl)) {
      showNotification(getTranslation('valid_image_url', language), 'error');
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
        imageUrl: formData.imageUrl,
        isAvailable: true
      };

      await addMenuItem(menuItem);
      
      showNotification(getTranslation('menu_item_added', language), 'success');
      onClose();
      resetForm();
    } catch (error) {
      showNotification(getTranslation('failed_add_item', language), 'error');
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
      category: 'south-indian',
      imageUrl: ''
    });
    setImagePreview('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle image URL preview
    if (field === 'imageUrl') {
      if (value && isValidImageUrl(value)) {
        setImagePreview(value);
      } else {
        setImagePreview('');
      }
    }
  };

  const isValidImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || url.includes('unsplash.com') || url.includes('pexels.com') || url.includes('pixabay.com');
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
              {getTranslation('item_name', language)} {getTranslation('english_label', language)} *
            </label>
            <input 
              type="text" 
              value={formData.nameEn}
              onChange={(e) => handleInputChange('nameEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder={getTranslation('enter_item_name', language)}
              required
              data-testid="item-name-en"
            />
          </div>

          {/* Hindi Name */}
          <div className="animate-slide-right animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('item_name', language)} {getTranslation('hindi_label', language)}
            </label>
            <input 
              type="text" 
              value={formData.nameHi}
              onChange={(e) => handleInputChange('nameHi', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder={getTranslation('enter_hindi_name', language)}
              data-testid="item-name-hi"
            />
          </div>

          {/* Marathi Name */}
          <div className="animate-slide-left animate-delay-500">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('item_name', language)} {getTranslation('marathi_label', language)}
            </label>
            <input 
              type="text" 
              value={formData.nameMr}
              onChange={(e) => handleInputChange('nameMr', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder={getTranslation('enter_marathi_name', language)}
              data-testid="item-name-mr"
            />
          </div>

          {/* English Description */}
          <div className="animate-slide-right animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('description', language)} {getTranslation('english_label', language)}
            </label>
            <textarea 
              value={formData.descEn}
              onChange={(e) => handleInputChange('descEn', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              rows={3} 
              placeholder={getTranslation('enter_description', language)}
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
              placeholder={getTranslation('enter_price', language)} 
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

          {/* Image URL */}
          <div className="animate-scale-in animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('image', language)} URL
            </label>
            <input 
              type="url" 
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="https://example.com/image.jpg"
              data-testid="item-image-url"
            />
            {imagePreview && (
              <div className="mt-3 animate-fade-in">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    setImagePreview('');
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  data-testid="image-preview"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">{getTranslation('image_preview', language)}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {getTranslation('image_url_help', language)}
            </p>
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
