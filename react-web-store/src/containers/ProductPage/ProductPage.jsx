import { useState, useEffect } from "react";
import { getProductById } from "../../services/firebase/products";
import { useParams } from "react-router-dom";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useContext } from "react";
import { UpdateContext } from "../../context/UpdateProvider";
import styles from "./ProductPage.module.scss";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import SuggestedCard from "../../componenets/SuggestedCard/SuggestedCard";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { cartInventory, updateCartInventory, getItemById } =
        useContext(CartInventoryContext);
    const { updated, updatePage } = useContext(UpdateContext);
    const { id } = useParams();
    const [available, setAvailable] = useState(false);
    const [system, setSystem] = useState();

    const addToCart = async () => {
        if (product.quantity >= 1) {
            const result = await updateCartInventory(id, 1, system);
            const data = await getProductById(id);
            setProduct(data);
            setAvailable(data.quantity >= 1);
            updatePage();
        }
    };

    const handleChange = (e) => {
        setSystem(e.target.value);
    };

    useEffect(() => {
        const wrapper = async () => {
            const data = await getProductById(id);
            setProduct(data);
            if (
                data.quantity <= 0 ||
                data.quantity - getItemById(id)?.quantityInCart <= 0
            ) {
                setAvailable(false);
            } else {
                setAvailable(true);
            }
            // setAvailable(data.quantity >= 1);
        };
        wrapper();
    }, []);

    return product ? (
        <div className={styles.Product}>
            <div className={styles.Product_Left}>
                <img src={product.imageUrl} alt="" />
                <h1>{product.name}</h1>
                <p>Price: ${product.unitPrice}</p>
                <button onClick={addToCart} disabled={!available}>
                    Add to Cart
                </button>
                <div>
                    <h2>Description:</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Modi architecto natus similique odio. Atque eius
                        magni praesentium iure, magnam error debitis. Modi a
                        nobis, quam iste quas quaerat est non.
                    </p>
                </div>
            </div>
            <div className={styles.Product_Right}>
                <div>
                    <label htmlFor="systemOptions">Select System: </label>
                    <select onChange={handleChange} id="systemOptions">
                        <option value={product.platforms.XBox}>XBox</option>
                        <option value={product.platforms.pc}>PC</option>
                        <option value={product.platforms.ps5}>PS5</option>
                    </select>
                </div>
                <div>
                    {available ? (
                        <p>Number in Stock: {product.quantity}</p>
                    ) : (
                        <p className="out-of-stock">
                            Sorry This product is out of stock
                        </p>
                    )}
                </div>

                <div>
                    {/* make a product context so I can easily access a different product from her */}
                    <h2>You may also like: </h2>
                    <SuggestedCard
                        productName={product.name}
                        image={product.imageUrl}
                        unitPrice={product.unitPrice}
                        id={product.id}
                        quantity={product.quantity}
                    />
                </div>
            </div>
        </div>
    ) : (
        <p>Loading Please Wait</p>
    );
};

export default ProductPage;
