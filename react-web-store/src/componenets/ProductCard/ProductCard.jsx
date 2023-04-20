import styles from "./ProductCard.module.scss";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getProductById } from "../../services/firebase/products";

const ProductCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [updated, setUpdated] = useState(0);
    const [available, setAvailable] = useState(true);
    const { updateCartInventory, cartInventory, getItemById } =
        useContext(CartInventoryContext);
    const addToCart = () => {
        updateCartInventory(id, 1);
        setUpdated(updated + 1);
    };

    useEffect(() => {
        const wrapper = async () => {
            const data = await getProductById(id);
            if (
                data.quantity <= 0 ||
                data.quantity - getItemById(id)?.quantityInCart <= 0
            ) {
                setAvailable(false);
            } else {
                setAvailable(true);
            }
        };
        wrapper();
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
