import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { MenuItem, Order, MenuCategory, OrderStatus } from '@/types';

export const useFirestore = () => {
  // Menu Items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // QR Code Settings
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState(true);

  // Load menu items
  useEffect(() => {
    const q = query(collection(db, 'menuItems'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: MenuItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Filter out deleted items
        if (!data.isDeleted) {
          items.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date()
          } as MenuItem);
        }
      });
      setMenuItems(items);
      setMenuLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load orders
  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ordersList.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          acceptedAt: data.acceptedAt?.toDate(),
          preparedAt: data.preparedAt?.toDate(),
          deliveredAt: data.deliveredAt?.toDate()
        } as Order);
      });
      setOrders(ordersList);
      setOrdersLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load QR Code Settings
  useEffect(() => {
    const q = query(collection(db, 'settings'), where('type', '==', 'qr_code'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const qrData = snapshot.docs[0].data();
        setQrCodeUrl(qrData.imageUrl || '');
      } else {
        setQrCodeUrl('');
      }
      setQrLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'createdAt'>): Promise<void> => {
    try {
      await addDoc(collection(db, 'menuItems'), {
        ...item,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to add menu item');
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      await addDoc(collection(db, 'orders'), {
        ...order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to place order');
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, notes?: string): Promise<void> => {
    try {
      const updates: any = {
        status,
        updatedAt: Timestamp.now()
      };

      if (status === 'accepted') {
        updates.acceptedAt = Timestamp.now();
      } else if (status === 'ready') {
        updates.preparedAt = Timestamp.now();
      } else if (status === 'delivered') {
        updates.deliveredAt = Timestamp.now();
      }

      if (notes) {
        updates.kitchenNotes = notes;
      }

      await updateDoc(doc(db, 'orders', orderId), updates);
    } catch (error) {
      throw new Error('Failed to update order status');
    }
  };

  const cancelOrder = async (orderId: string): Promise<void> => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'rejected',
        updatedAt: Timestamp.now(),
        kitchenNotes: 'Cancelled by customer'
      });
    } catch (error) {
      throw new Error('Failed to cancel order');
    }
  };

  const getOrdersByCategory = (category: MenuCategory): Order[] => {
    return orders.filter(order => order.category === category);
  };

  const getOrdersByStatus = (status: OrderStatus): Order[] => {
    return orders.filter(order => order.status === status);
  };

  const getTodayStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter(order => 
      order.createdAt >= today
    );

    // Calculate revenue only from non-cancelled orders
    const todayRevenue = todayOrders
      .filter(order => order.status !== 'rejected')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    const completedOrders = todayOrders.filter(order => 
      order.status === 'delivered'
    );

    const avgPrepTime = completedOrders.length > 0 
      ? completedOrders.reduce((sum, order) => {
          if (order.acceptedAt && order.preparedAt) {
            return sum + (order.preparedAt.getTime() - order.acceptedAt.getTime());
          }
          return sum;
        }, 0) / completedOrders.length / (1000 * 60) // Convert to minutes
      : 0;

    return {
      todayOrders: todayOrders.length,
      todayRevenue,
      avgPrepTime: Math.round(avgPrepTime),
      completedOrders: completedOrders.length
    };
  };

  const deleteMenuItem = async (itemId: string): Promise<void> => {
    try {
      await updateDoc(doc(db, 'menuItems', itemId), {
        isDeleted: true,
        deletedAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to delete menu item');
    }
  };

  const updateQrCode = async (imageUrl: string): Promise<void> => {
    try {
      const q = query(collection(db, 'settings'), where('type', '==', 'qr_code'));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Update existing QR code
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, 'settings', docId), {
          imageUrl,
          updatedAt: Timestamp.now()
        });
      } else {
        // Create new QR code setting
        await addDoc(collection(db, 'settings'), {
          type: 'qr_code',
          imageUrl,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      throw new Error('Failed to update QR code');
    }
  };

  return {
    menuItems,
    menuLoading,
    orders,
    ordersLoading,
    qrCodeUrl,
    qrLoading,
    addMenuItem,
    addOrder,
    updateOrderStatus,
    cancelOrder,
    deleteMenuItem,
    updateQrCode,
    getOrdersByCategory,
    getOrdersByStatus,
    getTodayStats
  };
};
