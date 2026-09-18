import axios from 'axios';
import './Checkout.css';
import { CheckoutHeader } from './CheckoutHeader';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
export function CheckOut({ cart, appData }) {
    const [deliveryTime, setDeliveryTime] = useState([]);
    const [paymentSum, setPaymentSum] = useState(null);
    useEffect(() => {
        const fetchDeliveryData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryTime(response.data)
        };
        fetchDeliveryData();
    }, [])
    useEffect(() => {
        const fetchPayData = async () => {
            const response = await axios.get('/api/payment-summary')
            setPaymentSum(response.data);
        };

        fetchPayData();
    }, [cart])

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummary cart={cart} deliveryTime={deliveryTime} appData={appData} />

                    <PaymentSummary paymentSum={paymentSum} appData={appData} />

                </div>
            </div >
        </>
    )

}