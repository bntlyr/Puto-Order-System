import { openDB, DBSchema } from 'idb';
import { Order, Item } from '../contexts/OrderContext';

interface ShopAdminDB extends DBSchema {
  orders: {
    key: string;
    value: Order;
  };
  items: {
    key: string;
    value: Item;
  };
}

const dbPromise = openDB<ShopAdminDB>('shop-admin-db', 1, {
  upgrade(db) {
    db.createObjectStore('orders', { keyPath: 'id' });
    db.createObjectStore('items', { keyPath: 'id' });
  },
});

export async function getOrders(): Promise<Order[]> {
  const db = await dbPromise;
  return db.getAll('orders');
}

export async function saveOrder(order: Order): Promise<void> {
  const db = await dbPromise;
  await db.put('orders', order);
}

export async function deleteOrder(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('orders', id);
}

export async function getItems(): Promise<Item[]> {
  const db = await dbPromise;
  return db.getAll('items');
}

export async function saveItem(item: Item): Promise<void> {
  const db = await dbPromise;
  await db.put('items', item);
}

export async function deleteItem(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete('items', id);
}

