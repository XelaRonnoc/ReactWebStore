import { useEffect } from "react";
import { createContext, useState } from "react";
import { incrementQuantity } from "../services/firebase/products";
export const CartInventoryContext = createContext();

const CartInventoryProvider = ({ children }) => {
    const [cartInventory, setCartInventory] = useState([]);

    const updateCartInventory = async (productId, incrementBy) => {
        const incrementNum = parseInt(incrementBy);
        const inventory = cartInventory;
        if (incrementNum > 0) {
            for (let i = incrementNum; i > 0; i--) {
                const index = inventory.indexOf(productId);
                inventory.splice(index, 1);
            }
        } else if (incrementNum <= 0) {
            for (let i = incrementNum; i < 0; i++) {
                inventory.push(productId);
            }
        }
        setCartInventory(inventory);
        return incrementQuantity(productId, incrementNum);
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
