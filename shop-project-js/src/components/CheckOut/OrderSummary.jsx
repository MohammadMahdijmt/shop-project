import dayjs from "dayjs";
import { DeliveryOption } from "./DeliveryOption";
import axios from "axios";


export function OrderSummary({ deliveryTime, cart, appData }) {
    return (
        <div className="order-summary">
            {deliveryTime.length > 0 && cart.map((cartItem) => {
                const deliveryDay = deliveryTime.find((deliveryOption) => {
                    return (deliveryOption.id === cartItem.deliveryOptionId)
                })

                const deleteCart = async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await appData();
                }
                const plusCart = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        quantity: cartItem.quantity + 1
                    })
                    await appData();
                }
                const minusCart = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        quantity: cartItem.quantity - 1
                    })
                    await appData();
                }


                return (
                    <div className="cart-item-container" key={cartItem.productId}>
                        <div className="delivery-date">
                            Delivery date: {dayjs(deliveryDay.estimatedDeliveryTimeMs).format('dddd , MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    ${(cartItem.product.priceCents / 100).toFixed(2)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                    </span>
                                    <div className="add-omit">
                                        <span className="plus" onClick={plusCart}><i> &#43;</i></span>
                                        <span className="minus" onClick={minusCart}><i>&minus;</i></span>
                                    </div>
                                    <span className="delete-quantity-link link-primary" onClick={deleteCart}>
                                        Delete All
                                    </span>
                                </div>
                            </div>

                            <div className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                <DeliveryOption deliveryTime={deliveryTime} cartItem={cartItem} appData={appData} />

                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};