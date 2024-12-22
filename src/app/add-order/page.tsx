'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrders, Order } from '../contexts/OrderContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AddOrder() {
  const { addOrder } = useOrders()
  const router = useRouter()
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'orderDate'>>({
    customerName: '',
    contact: '',
    location: '',
    fulfillmentMode: 'Delivery',
    deliveryDate: '',
    totalAmount: 0,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    paymentMethod: 'Cash',
    items: [], // Add this line
  })

  const handleAddOrder = () => {
    addOrder(newOrder)
    router.push('/orders')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Order</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newOrder.customerName}
                onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                value={newOrder.contact}
                onChange={(e) => setNewOrder({...newOrder, contact: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newOrder.location}
                onChange={(e) => setNewOrder({...newOrder, location: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="fulfillmentMode">Mode of Fulfillment</Label>
              <Select
                value={newOrder.fulfillmentMode}
                onValueChange={(value) => setNewOrder({...newOrder, fulfillmentMode: value as 'Delivery' | 'Pickup'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fulfillment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryDate">Date of Delivery/Pickup</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={newOrder.deliveryDate}
                onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                type="number"
                value={newOrder.totalAmount}
                onChange={(e) => setNewOrder({...newOrder, totalAmount: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={newOrder.paymentStatus}
                onValueChange={(value) => setNewOrder({...newOrder, paymentStatus: value as 'Paid' | 'Unpaid'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={newOrder.paymentMethod}
                onValueChange={(value) => setNewOrder({...newOrder, paymentMethod: value as 'Cash' | 'GCash'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="GCash">GCash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-4" onClick={handleAddOrder}>Add Order</Button>
        </CardContent>
      </Card>
    </div>
  )
}

