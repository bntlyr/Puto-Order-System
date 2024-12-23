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

const isBrowser = typeof window !== 'undefined';
const isIndexedDBSupported = isBrowser && 'indexedDB' in window;

const dbPromise = isIndexedDBSupported
  ? openDB<ShopAdminDB>('shop-admin-db', 1, {
      upgrade(db) {
        db.createObjectStore('orders', { keyPath: 'id' });
        db.createObjectStore('items', { keyPath: 'id' });
      },
    })
  : null;

export async function getOrders(): Promise<Order[]> {
  if (!isIndexedDBSupported) return [];
  const db = await dbPromise;
  return db ? db.getAll('orders') : [];
}

export async function saveOrder(order: Order): Promise<void> {
  if (!isIndexedDBSupported) return;
  const db = await dbPromise;
  if (db) await db.put('orders', order);
}

export async function deleteOrder(id: string): Promise<void> {
  if (!isIndexedDBSupported) return;
  const db = await dbPromise;
  if (db) await db.delete('orders', id);
}

export async function getItems(): Promise<Item[]> {
  if (!isIndexedDBSupported) return [];
  const db = await dbPromise;
  return db ? db.getAll('items') : [];
}

export async function saveItem(item: Item): Promise<void> {
  if (!isIndexedDBSupported) return;
  const db = await dbPromise;
  if (db) await db.put('items', item);
}

export async function deleteItem(id: string): Promise<void> {
  if (!isIndexedDBSupported) return;
  const db = await dbPromise;
  if (db) await db.delete('items', id);
}

