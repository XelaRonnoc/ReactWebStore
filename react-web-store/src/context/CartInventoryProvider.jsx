import { useEffect } from "react";
import { createContext, useState } from "react";
import { incrementQuantity } from "../services/firebase/products";
export const CartInventoryContext = createContext();

const CartInventoryProvider = ({ children }) => {
    const [cartInventory, setCartInventory] = useState([]);

    const updateCartInventory = async (product) => {
        const inventory = cartInventory;
        inventory.push(product);
        setCartInventory(inventory);
        return incrementQuantity(product, -1);
        // console.log(`added ${product} to cart`);
        // console.log(cartInventory);
    };

    const data = { cartInventory, updateCartInventory };

    return (
        <CartInventoryContext.Provider value={data}>
            {children}
        </CartInventoryContext.Provider>
    );
};

export default CartInventoryProvider;
