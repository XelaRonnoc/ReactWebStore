import { createContext, useState } from "react";
import {
    incrementQuantity,
    getProductById,
    getAllProducts,
} from "../services/firebase/products";
export const CartInventoryContext = createContext();

const CartInventoryProvider = ({ children }) => {
    const [cartInventory, setCartInventory] = useState([]);
    const [initalSetupComplete, setInitialSetupComplete] = useState(false);

    const updateCartInventory = async (productId, incrementBy) => {
        // const curQuantity = await getProductById(productId).quantity;
        // // console.log(curQuantity);
        // if (curQuantity > incrementBy) {
        const cartHolder = cartInventory;
        let indexToUpdate = -1;
        for (let i = 0; i < cartHolder.length; i++) {
            if (cartHolder[i].productsObj.id === productId) {
                indexToUpdate = i;
                break;
            }
        }
        cartHolder[indexToUpdate].quantityInCart += incrementBy;
        setCartInventory(cartHolder);
        // }
    };

    const purchaseItemsInCart = async () => {
        const itemsInCart = cartInventory.filter(
            (item) => item.quantityInCart > 0
        );

        itemsInCart.forEach((item) => {
            incrementQuantity(item.productsObj.id, -item.quantityInCart);
        });
        console.log("Purchase complete");

        cartInventory.forEach((item) => (item.quantityInCart = 0));
    };

    const getItemById = (id) => {
        const result = cartInventory.find((item) => {
            if (item.productsObj.id === id) {
                return item;
            }
        });
        return result;
    };

    const initialCartInventory = (products) => {
        if (products && !initalSetupComplete) {
            const productCart = products.map((item) => {
                return { productsObj: item, quantityInCart: 0 };
            });
            setCartInventory(productCart);
            setInitialSetupComplete(true);
        }
    };

    const data = {
        cartInventory,
        initialCartInventory,
        updateCartInventory,
        getItemById,
        purchaseItemsInCart,
    };

    return (
        <CartInventoryContext.Provider value={data}>
            {children}
        </CartInventoryContext.Provider>
    );
};

export default CartInventoryProvider;
