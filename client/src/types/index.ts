export type UserRole = 'customer' | 'south-kitchen' | 'kolhapuri-kitchen' | 'admin';
export type Language = 'en' | 'hi' | 'mr';
export type OrderStatus = 'new' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'rejected';
export type MenuCategory = 'south-indian' | 'kolhapuri';

export interface MenuItem {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  price: number;
  category: MenuCategory;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  tableNumber: number;
  status: OrderStatus;
  category: MenuCategory;
  price: number;
  totalAmount: number;
  customerNotes?: string;
  kitchenNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  preparedAt?: Date;
  deliveredAt?: Date;
}

export interface User {
  uid: string;
  email: string;
  role: UserRole;
}

export interface KitchenStats {
  todayOrders: number;
  activeOrders: number;
  avgPrepTime: number;
  completedOrders: number;
}

export interface AdminStats {
  todayOrders: number;
  todayRevenue: number;
  avgPrepTime: number;
  growth: number;
  totalMenuItems: number;
  activeKitchens: number;
}
