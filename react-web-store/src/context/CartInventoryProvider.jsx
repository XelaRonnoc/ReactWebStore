import { createContext, useState } from "react";
import { incrementQuantity } from "../services/firebase/products";
export const CartInventoryContext = createContext();

const CartInventoryProvider = ({ children }) => {
    const [cartInventory, setCartInventory] = useState([]);
    const [initalSetupComplete, setInitialSetupComplete] = useState(false);

    // used to update quantity of items in cart inventory does not touch db
    const updateCartInventory = async (
        productId,
        incrementBy,
        system = "XBox"
    ) => {
        const cartHolder = cartInventory;
        const indexToUpdate = cartHolder.findIndex(
            (obj) => obj.productsObj.id === productId
        );
        cartHolder[indexToUpdate].quantityInCart += incrementBy;
        cartHolder[indexToUpdate].system = system;
        setCartInventory(cartHolder);
    };

    // reads the cart inventory for anything with more than 0 in quantity and then substracts this quantity from relevant items in db
    const purchaseItemsInCart = async () => {
        const itemsInCart = cartInventory.filter(
            (item) => item.quantityInCart > 0
        );

        itemsInCart.forEach((item) => {
            incrementQuantity(item.productsObj.id, -item.quantityInCart);
        });

        cartInventory.forEach((item) => (item.quantityInCart = 0));
    };

    // allows for searching through cart without going back to db
    const getItemById = (id) => {
        const result = cartInventory.find((item) => {
            if (item.productsObj.id === id) {
                return item;
            }
        });
        return result;
    };

    // initialises the cart inventory with all products from db
    const initialCartInventory = (products) => {
        if (products && !initalSetupComplete) {
            const productCart = products.map((item) => {
                return { productsObj: item, quantityInCart: 0, system: "" };
            });
            setCartInventory(productCart);
            setInitialSetupComplete(true);
        }
    };

    // what should be sent to other components
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
