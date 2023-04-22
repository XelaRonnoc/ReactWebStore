import styles from "./SuggestedCard.module.scss";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getProductById } from "../../services/firebase/products";

const SuggestedCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [updated, setUpdated] = useState(0);
    const [available, setAvailable] = useState(true);
    const { getItemById } = useContext(CartInventoryContext);

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
        <div className={styles.SuggestedCard}>
            <NavLink className={styles.SuggestedCard_Link} to={`/${id}`}>
                <img className={styles.SuggestedCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>Price: ${unitPrice}</p>
                {available ? (
                    <p>In Stock</p>
                ) : (
                    <p className="out-of-stock">Out of Stock</p>
                )}
            </NavLink>
        </div>
    );
};

export default SuggestedCard;