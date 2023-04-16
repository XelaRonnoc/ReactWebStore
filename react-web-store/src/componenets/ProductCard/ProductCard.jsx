import styles from "./ProductCard.module.scss";
import { NavLink } from "react-router-dom";

const ProductCard = ({ productName, unitPrice, image, id }) => {
    return (
        <NavLink to={`/home/${id}`}>
            <div className={styles.ProductCard}>
                <img className={styles.ProductCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>${unitPrice}</p>
            </div>
        </NavLink>
    );
};

export default ProductCard;
