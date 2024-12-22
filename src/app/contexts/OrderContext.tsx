'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as db from '../utils/db';

export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface OrderItem {
  item: Item;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  contact: string;
  location: string;
  fulfillmentMode: 'Delivery' | 'Pickup';
  orderDate: string;
  deliveryDate: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid';
  orderStatus: 'Pending' | 'Delivered' | 'Picked-up';
  paymentMethod: 'Cash' | 'GCash';
}

interface OrderContextType {
  orders: Order[];
  items: Item[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => Promise<void>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  markAsComplete: (id: string) => Promise<void>;
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
  updateItem: (id: string, item: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedOrders = await db.getOrders();
      const loadedItems = await db.getItems();
      setOrders(loadedOrders);
      setItems(loadedItems);
    };
    loadData();
  }, []);

  const addOrder = async (order: Omit<Order, 'id' | 'orderDate'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      orderDate: new Date().toISOString(),
    };
    await db.saveOrder(newOrder);
    setOrders([...orders, newOrder]);
  };

  const updateOrder = async (id: string, updatedOrder: Partial<Order>) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const newOrder = { ...order, ...updatedOrder };
      await db.saveOrder(newOrder);
      setOrders(orders.map(o => o.id === id ? newOrder : o));
    }
  };

  const deleteOrder = async (id: string) => {
    await db.deleteOrder(id);
    setOrders(orders.filter(order => order.id !== id));
  };

  const markAsComplete = async (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const updatedOrder = {
        ...order,
        orderStatus: order.fulfillmentMode === 'Delivery' ? 'Delivered' as 'Delivered' : 'Picked-up' as 'Picked-up'
      };
      await db.saveOrder(updatedOrder);
      setOrders(orders.map(o => o.id === id ? updatedOrder : o));
    }
  };

  const addItem = async (item: Omit<Item, 'id'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
    };
    await db.saveItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async (id: string, updatedItem: Partial<Item>) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newItem = { ...item, ...updatedItem };
      await db.saveItem(newItem);
      setItems(items.map(i => i.id === id ? newItem : i));
    }
  };

  const deleteItem = async (id: string) => {
    await db.deleteItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        items,
        addOrder,
        updateOrder,
        deleteOrder,
        markAsComplete,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

