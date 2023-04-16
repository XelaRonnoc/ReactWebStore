import styles from "./ProductCard.module.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";

const ProductCard = ({ productName, unitPrice, image, id }) => {
    const { updateCartInventory } = useContext(CartInventoryContext);
    const addToCart = () => {
        updateCartInventory(id);
    };
    return (
        <div className={styles.ProductCard}>
            <NavLink to={`/home/${id}`}>
                <img className={styles.ProductCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>${unitPrice}</p>
            </NavLink>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
