import { useState, useContext, useEffect } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getAllProducts } from "../../services/firebase/products";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import CartCard from "../../componenets/CartCard/CartCard";
import { UpdateContext } from "../../context/UpdateProvider";
import styles from "./Cart.module.scss";

const Cart = () => {
    const [products, setProducts] = useState(null);
    const { updateCartInventory, cartInventory, purchaseItemsInCart } =
        useContext(CartInventoryContext);
    const { updatePage, updated } = useContext(UpdateContext);
    const [purchased, setPurchased] = useState(false);

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
            setProducts(inCart);
        };
        console.log("Cart Page refreshing");
        wrapper();
    }, [cartInventory, updated]);

    console.log(products);

    return (
        <>
            <h1>Cart</h1>
            <div className={styles.Cart}>
                <div className={styles.Cart_Products}>
                    {products &&
                        products.map((prod) => {
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
                {products?.length > 0 ? (
                    <button
                        className={styles.Cart_Purchase}
                        onClick={handleClick}
                    >
                        Purchase
                    </button>
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
