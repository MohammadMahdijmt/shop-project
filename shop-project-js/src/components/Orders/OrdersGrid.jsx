import dayjs from "dayjs";
import { OrderDetailsGrid } from "./OrderDetailsGrid";
export function OrdersGrid({ orders, appData }) {
    return (
        <div className="orders-grid">
            {orders.map((orderItem) => {
                return (
                    <div key={orderItem.id} className="order-container">

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{dayjs(orderItem.orderTimeMs).format('MMMM D')}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>{(orderItem.totalCostCents / 100).toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{orderItem.id} </div>
                            </div>
                        </div>

                        <OrderDetailsGrid orderItem={orderItem} appData={appData} />

                    </div>
                )
            })}

        </div>
    )
}