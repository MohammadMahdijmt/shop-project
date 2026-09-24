import { createContext } from "react";
export const AppdataContext = createContext(null);
import { useState, useEffect } from "react";
import axios from "axios";
export function AppdataProvider({ children }) {
    const [cart, setCart] = useState([])

    const appData = async () => {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
    }
    useEffect(() => {
        appData();
    }, []);

    return (
        <AppdataContext.Provider value={{ cart, setCart, appData }}>
            {children}
        </AppdataContext.Provider>
    )
}