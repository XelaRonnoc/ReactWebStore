import { useState, useContext, useEffect } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getAllProducts } from "../../services/firebase/products";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import CartCard from "../../componenets/CartCard/CartCard";
import { UpdateContext } from "../../context/UpdateProvider";
import styles from "./Cart.module.scss";
import { ProductContext } from "../../context/ProductProvider";

const Cart = () => {
    const [productsInCart, setProductsInCart] = useState(null);
    const { cartInventory, purchaseItemsInCart, getTotalPrice } =
        useContext(CartInventoryContext);
    const { updatePage, updated } = useContext(UpdateContext);
    const [purchased, setPurchased] = useState(false);

    // handles the purchase btn being clicked and calls the purchase method
    const handleClick = (e) => {
        e.preventDefault();
        purchaseItemsInCart();
        updatePage();
        setPurchased(true);
    };

    useEffect(() => {
        const wrapper = async () => {
            const inCart = cartInventory.filter((obj) => {
                if (obj.quantityInCart > 0) {
                    return obj.productsObj;
                }
            });
            setProductsInCart(inCart);
        };
        wrapper();
    }, [cartInventory, updated]);

    return (
        <>
            <h1>Cart</h1>
            <div className={styles.Cart}>
                <div className={styles.Cart_Products}>
                    {productsInCart &&
                        productsInCart.map((prod) => {
                            return (
                                <CartCard
                                    key={prod.productsObj.id}
                                    productName={prod.productsObj.name}
                                    image={prod.productsObj.imageUrl}
                                    unitPrice={prod.productsObj.unitPrice}
                                    id={prod.productsObj.id}
                                    update={updated}
                                />
                            );
                        })}
                </div>
                {productsInCart?.length > 0 ? (
                    <div className={styles.Cart_Container}>
                        <h3>Cost Summary:</h3>
                        <p>subTotal: ${getTotalPrice()}</p>
                        <p>
                            GST(10%): $
                            {Math.floor(getTotalPrice() * 0.1 * 100) / 100}
                        </p>
                        <p>Total: ${getTotalPrice() + getTotalPrice() * 0.1}</p>
                        <button
                            className={styles.Cart_Container_Purchase}
                            onClick={handleClick}
                        >
                            Purchase
                        </button>
                    </div>
                ) : !purchased ? (
                    <p>No Items Currently In Cart</p>
                ) : (
                    <h1>Thank You For Your Purchase!!</h1>
                )}
            </div>
        </>
    );
};

export default Cart;
