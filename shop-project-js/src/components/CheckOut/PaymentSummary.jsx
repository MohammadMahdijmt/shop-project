import axios from "axios"
import { useNavigate } from "react-router";

export function PaymentSummary({ paymentSum, appData }) {
    const navigate = useNavigate();
    const orderProduct = async () => {
        await axios.post('/api/orders')
        await appData();
        navigate('/orders')

    }
    return (
        <>
            {paymentSum &&

                (

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items {paymentSum.totalItems}:</div>
                            <div className="payment-summary-money">${(paymentSum.productCostCents / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{(paymentSum.shippingCostCents / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{(paymentSum.totalCostBeforeTaxCents / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{(paymentSum.taxCents / 100).toFixed(2)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">${(paymentSum.totalCostCents / 100).toFixed(2)}</div>
                        </div>

                        <button className="place-order-button button-primary" onClick={orderProduct}>
                            Place your order
                        </button>
                    </div>)}
        </>
    )
}