import styles from "./SuggestedCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getProductById } from "../../services/firebase/products";

const SuggestedCard = ({
    productName,
    unitPrice,
    image,
    id,
    quantity,
    setAdded,
}) => {
    const [available, setAvailable] = useState(true);
    const { getItemById } = useContext(CartInventoryContext);
    const navigate = useNavigate();

    // navigates to the product page of this product
    const handleClick = (e) => {
        e.stopPropagation();
        setAdded(false);
        navigate(`/${id}`);
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
    }, []);

    return (
        <div className={styles.SuggestedCard}>
            <div onClick={handleClick} className={styles.SuggestedCard_Link}>
                <img className={styles.SuggestedCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>Price: ${unitPrice}</p>
                {available ? (
                    <p>In Stock</p>
                ) : (
                    <p className="out-of-stock">Out of Stock</p>
                )}
            </div>
        </div>
    );
};

export default SuggestedCard;
