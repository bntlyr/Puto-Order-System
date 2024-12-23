'use client'

import { useState, useMemo } from 'react'
import { useOrders, Order, OrderItem } from '../contexts/OrderContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Orders() {
  const { orders, items, addOrder, deleteOrder, updateOrder } = useOrders()
  const [filter, setFilter] = useState({ status: 'all', payment: 'all' })
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'orderDate'>>({
    customerName: '',
    contact: '',
    location: '',
    fulfillmentMode: 'Delivery',
    deliveryDate: '',
    items: [],
    totalAmount: 0,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    paymentMethod: 'Cash',
  })
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      (filter.status === 'all' || 
       (filter.status === 'completed' && order.orderStatus !== 'Pending') ||
       (filter.status === 'pending' && order.orderStatus === 'Pending')) &&
      (filter.payment === 'all' || order.paymentStatus === filter.payment)
    )
  }, [orders, filter])

  const handleAddOrder = () => {
    const orderItems = Array.from(selectedItems).map(([itemId, quantity]) => {
      const item = items.find(i => i.id === itemId)
      return { item, quantity } as OrderItem
    })
    const totalAmount = orderItems.reduce((sum, i) => sum + i.item.price * i.quantity, 0)
    const orderToAdd = { ...newOrder, items: orderItems, totalAmount }
    addOrder(orderToAdd)
    setNewOrder({
      customerName: '',
      contact: '',
      location: '',
      fulfillmentMode: 'Delivery',
      deliveryDate: '',
      items: [],
      totalAmount: 0,
      paymentStatus: 'Unpaid',
      orderStatus: 'Pending',
      paymentMethod: 'Cash',
    })
    setSelectedItems(new Map())
    setIsDialogOpen(false)
  }

  const handleItemQuantityChange = (itemId: string, quantity: number | null) => {
    setSelectedItems(prev => {
      const updated = new Map(prev);
      if (quantity !== null && quantity > 0) {
        updated.set(itemId, quantity);
      } else {
        updated.delete(itemId);
      }
      return updated;
    });
  };

  const handleItemSelection = (itemId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems(new Map(selectedItems).set(itemId, 1))
    } else {
      const updated = new Map(selectedItems)
      updated.delete(itemId)
      setSelectedItems(updated)
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const handleToggleComplete = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newStatus = order.orderStatus === 'Pending' 
        ? (order.fulfillmentMode === 'Delivery' ? 'Delivered' : 'Picked-up')
        : 'Pending';
      updateOrder(orderId, { orderStatus: newStatus });
    }
  };

  const handleTogglePaid = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const newPaymentStatus = order.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
      updateOrder(orderId, { paymentStatus: newPaymentStatus });
    }
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <Button
          data-add-order-trigger
          style={{ display: 'none' }}
          onClick={() => setIsDialogOpen(true)}
        >
          Add New Order
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">Customer Name</Label>
              <Input
                id="customerName"
                value={newOrder.customerName}
                onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">Contact</Label>
              <Input
                id="contact"
                value={newOrder.contact}
                onChange={(e) => setNewOrder({ ...newOrder, contact: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input
                id="location"
                value={newOrder.location}
                onChange={(e) => setNewOrder({ ...newOrder, location: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fulfillmentMode" className="text-right">Fulfillment</Label>
              <Select
                value={newOrder.fulfillmentMode}
                onValueChange={(value) => setNewOrder({ ...newOrder, fulfillmentMode: value as 'Delivery' | 'Pickup' })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select fulfillment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryDate" className="text-right">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={newOrder.deliveryDate}
                onChange={(e) => setNewOrder({ ...newOrder, deliveryDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Items</Label>
              <div className="col-span-3 space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-2 pb-2 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={selectedItems.has(item.id)}
                        onCheckedChange={(checked) => handleItemSelection(item.id, checked as boolean)}
                      />
                      <label htmlFor={`item-${item.id}`} className="text-sm font-medium leading-none">
                        {item.name} - ₱{item.price.toFixed(2)}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="0"
                        value={selectedItems.get(item.id) || ''}
                        onChange={(e) => handleItemQuantityChange(item.id, e.target.value === '' ? null : parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddOrder}>Add Order</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Select
            value={filter.status}
            onValueChange={(value) => setFilter({ ...filter, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.payment}
            onValueChange={(value) => setFilter({ ...filter, payment: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOrders.map(order => (
        <Card key={order.id} className="mb-4">
          <CardHeader
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleOrderExpansion(order.id)}
          >
            <CardTitle>{order.customerName}</CardTitle>
            {expandedOrderId === order.id ? <ChevronUp /> : <ChevronDown />}
          </CardHeader>
          {expandedOrderId === order.id && (
            <CardContent>
              <div>
                <p>Contact: {order.contact}</p>
                <p>Location: {order.location}</p>
                <p>Fulfillment Mode: {order.fulfillmentMode}</p>
                <p>Delivery Date: {order.deliveryDate}</p>
                <p>Order Status: {order.orderStatus}</p>
                <p>Payment Status: {order.paymentStatus}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Total Amount: ₱{order.totalAmount.toFixed(2)}</p>
                <p>Items:</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.item.name} x {item.quantity} - ₱{(item.item.price * item.quantity).toFixed(2)}</li>
                  ))}
                </ul>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={() => handleToggleComplete(order.id)}>
                    Mark as {order.orderStatus === 'Pending' ? 'Completed' : 'Pending'}
                  </Button>
                  <Button onClick={() => handleTogglePaid(order.id)}>
                    Mark as {order.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid'}
                  </Button>
                  <Button variant="destructive" onClick={() => deleteOrder(order.id)}>
                    Delete Order
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <FloatingActionButton
        onClick={() => setIsDialogOpen(true)}
        aria-label="Add Order"
      />
    </div>
  )
}
