import { createContext, useState } from "react";
import {
    incrementQuantity,
    getProductById,
} from "../services/firebase/products";
export const CartInventoryContext = createContext();

const CartInventoryProvider = ({ children }) => {
    const [cartInventory, setCartInventory] = useState([]);

    const updateCartInventory = (productId, incrementBy) => {
        //     const incrementNum = parseInt(incrementBy);
        //     const inventory = cartInventory;
        //     if (incrementNum > 0) {
        //         for (let i = incrementNum; i > 0; i--) {
        //             const index = inventory.indexOf(productId);
        //             inventory.splice(index, 1);
        //         }
        //     } else if (incrementNum <= 0) {
        //         for (let i = incrementNum; i < 0; i++) {
        //             inventory.push(productId);
        //         }
        //     }
        //     setCartInventory(inventory);
        //     return incrementQuantity(productId, incrementNum);
        // console.log(`added ${product} to cart`);
        // console.log(cartInventory);

        const cartHolder = cartInventory;
        // const indexToUpdate = cartHolder.indexOf((obj) => {
        //     return obj.productsObj.id === productId;
        // });
        let indexToUpdate = -1;
        for (let i = 0; i < cartHolder.length; i++) {
            if (cartHolder[i].productsObj.id === productId) {
                indexToUpdate = i;
                break;
            }
        }
        cartHolder[indexToUpdate].quantityInCart += incrementBy;
        setCartInventory(cartHolder);
        return incrementQuantity(productId, -incrementBy);
    };

    const initialCartInventory = (products) => {
        if (products) {
            const productCart = products.map((item) => {
                return { productsObj: item, quantityInCart: 0 };
            });
            setCartInventory(productCart);
        }
    };

    const data = { cartInventory, initialCartInventory, updateCartInventory };

    return (
        <CartInventoryContext.Provider value={data}>
            {children}
        </CartInventoryContext.Provider>
    );
};

export default CartInventoryProvider;
