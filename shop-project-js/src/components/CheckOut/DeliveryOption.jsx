import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import { AppdataContext } from "../../Context/AppdataContext";
export function DeliveryOption({ deliveryTime, cartItem }) {
    const { appData } = useContext(AppdataContext);
    return (
        <>
            {deliveryTime.map((deliveryOption) => {
                let priceShip = 'FREE Shipping';
                if (deliveryOption.priceCents > 0) {
                    priceShip = `$${deliveryOption.priceCents / 100}-Shipping`

                }
                const updateDelivery = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id
                    });
                    await appData();

                }

                return (

                    <div className="delivery-option" onClick={updateDelivery}
                    >
                        <input type="radio" className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} checked={deliveryOption.id === cartItem.deliveryOptionId} onChange={() => { }} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd , MMMM D')}
                            </div>
                            <div className="delivery-option-price">

                                {priceShip}
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )

}