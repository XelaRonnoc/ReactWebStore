import styles from "./ProductCard.module.scss";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getProductById } from "../../services/firebase/products";
import { UpdateContext } from "../../context/UpdateProvider";

const ProductCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [curProduct, setCurrentProduct] = useState();
    const { updated, updatePage } = useContext(UpdateContext);
    const [available, setAvailable] = useState(true);
    const [system, setSystem] = useState();
    const [added, setAdded] = useState(false);
    const { updateCartInventory, getItemById } =
        useContext(CartInventoryContext);

    const addToCart = () => {
        updateCartInventory(id, 1, system);
        setAdded(true);
        updatePage();
    };

    const handleChange = (e) => {
        setSystem(e.target.value);
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
            setCurrentProduct(data);
        };
        wrapper();
    }, [updated]);

    return (
        <div className={styles.ProductCard}>
            <NavLink
                className={styles.ProductCard_Link}
                to={`/ReactWebStore/${id}`}
            >
                <img className={styles.ProductCard_Image} src={image}></img>
                <h3>{productName}</h3>
                <p>Price: ${unitPrice}</p>
                {available ? (
                    <p>In Stock</p>
                ) : (
                    <p className="out-of-stock">Out of Stock</p>
                )}
            </NavLink>
            <div className={styles.Interactable}>
                {curProduct && (
                    <select onChange={handleChange} id="systemOptions">
                        <option value={curProduct.platforms.XBox}>XBox</option>
                        <option value={curProduct.platforms.pc}>PC</option>
                        <option value={curProduct.platforms.ps5}>PS5</option>
                    </select>
                )}
                {!added ? (
                    <button onClick={addToCart} disabled={!available}>
                        Add to Cart
                    </button>
                ) : (
                    <p>Added To Cart!</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
