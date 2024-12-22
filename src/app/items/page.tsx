'use client';

import { useState } from 'react';
import { useOrders, Item } from '../contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FloatingActionButton from '@/components/FloatingActionButton';

export default function Items() {
  const { items, addItem, deleteItem } = useOrders();
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    name: '',
    price: 0,
    description: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog open state

  const handleAddItem = () => {
    if (newItem.name && newItem.price > 0) {
      addItem({ ...newItem });
      setNewItem({ name: '', price: 0, description: '' });
      setDialogOpen(false); // Close the dialog
    } else {
      alert('Please provide a valid name and price.');
    }
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Items</h1>

      {/* Dialog to add new item */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            data-add-item-trigger
            className="hidden" // Keep this hidden, it will be triggered by the floating button
          >
            Add New Item
          </Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (PHP)
              </Label>
              <Input
                id="price"
                type="number"
                value={newItem.price === 0 ? '' : newItem.price}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewItem({
                    ...newItem,
                    price: value === '' ? 0 : parseFloat(value),
                  });
                }}
                className="col-span-3"
                step="0.01"
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddItem}>Add Item</Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Price:</strong> ₱{item.price.toFixed(2)}
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
              <Button
                onClick={() => deleteItem(item.id)}
                variant="destructive"
                className="mt-2"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setDialogOpen(true)} />
    </div>
  );
}
