import styles from "./ProductCard.module.scss";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";

const ProductCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [updated, setUpdated] = useState(0);
    const [available, setAvailable] = useState(true);
    const { updateCartInventory, cartInventory, getItemById } =
        useContext(CartInventoryContext);
    const addToCart = () => {
        updateCartInventory(id, 1);
        setUpdated(updated + 1);
    };

    const justWork = () => {
        return getItemById(id);
    };
    // || quantity - getItemById(id).quantityInCart <= 0)
    useEffect(() => {
        const inCart = justWork();
        console.log(inCart, "inCart");
        if (quantity <= 0 || quantity - inCart <= 0) {
            setAvailable(false);
        } else {
            setAvailable(true);
        }
    }, [updated]);

    return (
        <div className={styles.ProductCard}>
            <NavLink to={`/${id}`}>
                <img className={styles.ProductCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>${unitPrice}</p>
            </NavLink>
            <button onClick={addToCart} disabled={!available}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
