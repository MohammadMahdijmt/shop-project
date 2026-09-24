import axios from 'axios';
import './Orders.css';
import { Header } from '../Header/Header';
import { useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid';


export function Orders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrderData = async () => {
            const response = await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        };
        fetchOrderData();

    }, [])
    return (

        <>
            <title>Orders</title>

            <Header />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>


        </>
    )
}