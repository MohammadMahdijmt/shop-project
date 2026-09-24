import { Link } from "react-router";
import dayjs from "dayjs";
import { Fragment, useContext } from "react";
import axios from "axios";
import { AppdataContext } from "../../Context/AppdataContext";
export function OrderDetailsGrid({ orderItem }) {
    const { appData } = useContext(AppdataContext)
    return (
        <div className="order-details-grid">
            {orderItem.products.map((orderProduct) => {
                const addToCart = async () => {
                    await axios.post("/api/cart-items", {
                        productId: orderProduct.product.id,
                        quantity: 1
                    })
                    await appData();

                }

                return (
                    <Fragment key={orderProduct.id}>
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                            <div className="product-name">
                                {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                                Arriving on:
                                {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                            <div className="product-quantity">
                                Quantity: {orderProduct.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                <span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
                            </button>
                        </div>

                        <div className="product-actions">
                            <Link to="/tracking">
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </Fragment>
                )
            })}


        </div>
    )
}