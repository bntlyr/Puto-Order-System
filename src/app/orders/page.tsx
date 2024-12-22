'use client'

import { useState } from 'react'
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
  const { orders, items, addOrder, deleteOrder, markAsComplete, updateOrder } = useOrders()
  const [filter, setFilter] = useState({ status: 'all', payment: 'all', fulfillment: 'all' })
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

  const filteredOrders = orders.filter(order => 
    (filter.status === 'all' || order.orderStatus === filter.status) &&
    (filter.payment === 'all' || order.paymentStatus === filter.payment) &&
    (filter.fulfillment === 'all' || order.fulfillmentMode === filter.fulfillment)
  )

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

  const undoMarkAsComplete = (orderId: string) => {
    // Revert the order's status back to its original state before it was marked as completed
    const order = orders.find(o => o.id === orderId);
    if (order) {
      updateOrder(orderId, { orderStatus: 'Pending' }); // or the previous status
    }
  };
  
  const undoMarkAsPaid = (orderId: string) => {
    // Revert the payment status back to its original state before it was marked as paid
    const order = orders.find(o => o.id === orderId);
    if (order) {
      updateOrder(orderId, { paymentStatus: 'Unpaid' }); // or the previous status
    }
  };
  

  const handleMarkAsPaid = (orderId: string) => {
    updateOrder(orderId, { paymentStatus: 'Paid' })
  }

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
        <DialogContent className="sm:max-w-[425px]">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Items</Label>
              <div className="col-span-3 space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={selectedItems.has(item.id)}
                      onCheckedChange={(checked) => handleItemSelection(item.id, checked as boolean)}
                    />
                    <label htmlFor={`item-${item.id}`} className="text-sm font-medium leading-none">
                      {item.name} - ₱{item.price.toFixed(2)}
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={selectedItems.get(item.id) || ""} 
                      onChange={(e) => handleItemQuantityChange(item.id, e.target.value ? parseInt(e.target.value) : 1)}  
                      className="w-16"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentStatus" className="text-right">Payment Status</Label>
              <Select
                value={newOrder.paymentStatus}
                onValueChange={(value) => setNewOrder({ ...newOrder, paymentStatus: value as 'Paid' | 'Unpaid' })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">Payment Method</Label>
              <Select
                value={newOrder.paymentMethod}
                onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value as 'Cash' | 'GCash' })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="GCash">GCash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddOrder}>Add Order</Button>
        </DialogContent>
      </Dialog>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Filters</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            value={filter.status}
            onValueChange={(value) => setFilter({ ...filter, status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Picked-up">Picked-up</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.payment}
            onValueChange={(value) => setFilter({ ...filter, payment: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filter.fulfillment}
            onValueChange={(value) => setFilter({ ...filter, fulfillment: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by fulfillment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fulfillments</SelectItem>
              <SelectItem value="Delivery">Delivery</SelectItem>
              <SelectItem value="Pickup">Pickup</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer flex flex-col p-4"
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${order.orderStatus !== 'Pending' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <CardTitle className="text-lg">{order.customerName}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">₱{order.totalAmount.toFixed(2)}</span>
                  {expandedOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {new Date(order.deliveryDate).toLocaleDateString()} | {order.fulfillmentMode}
              </div>
              <div className={`mt-1 text-sm ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                {order.paymentStatus}
              </div>
            </CardHeader>
            {expandedOrderId === order.id && (
              <CardContent className="p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Contact:</strong> {order.contact}</p>
                    <p><strong>Location:</strong> {order.location}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <strong>Items:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.item.name} - {item.quantity} x ₱{item.item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 space-x-2">
                  <Button onClick={() => markAsComplete(order.id)} disabled={order.orderStatus !== 'Pending'}>
                    Mark as Complete
                  </Button>
                  <Button onClick={() => handleMarkAsPaid(order.id)} disabled={order.paymentStatus === 'Paid'}>
                    Mark as Paid
                  </Button>
                  <Button onClick={() => deleteOrder(order.id)} variant="destructive">
                    Delete
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <FloatingActionButton onClick={() => setIsDialogOpen(true)} />
    </div>
  )
}

