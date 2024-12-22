'use client'

import { useOrders } from './contexts/OrderContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const { orders } = useOrders()

  const pendingPayments = orders.filter(order => order.paymentStatus === 'Unpaid').length
  const upcomingDeliveries = orders.filter(order => order.orderStatus === 'Pending' && order.fulfillmentMode === 'Delivery').length
  const upcomingPickups = orders.filter(order => order.orderStatus === 'Pending' && order.fulfillmentMode === 'Pickup').length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">{orders.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">{pendingPayments}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">{upcomingDeliveries}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">{upcomingPickups}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">₱{totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

