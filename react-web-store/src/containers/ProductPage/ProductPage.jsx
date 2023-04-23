import { useState, useEffect } from "react";
import { getProductById } from "../../services/firebase/products";
import { useParams } from "react-router-dom";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useContext } from "react";
import { UpdateContext } from "../../context/UpdateProvider";
import styles from "./ProductPage.module.scss";

import SuggestedCard from "../../componenets/SuggestedCard/SuggestedCard";
import { ProductContext } from "../../context/ProductProvider";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { updateCartInventory, getItemById } =
        useContext(CartInventoryContext);
    const { updated, updatePage } = useContext(UpdateContext);
    const { id } = useParams();
    const [available, setAvailable] = useState(false);
    const [system, setSystem] = useState();
    const { products } = useContext(ProductContext);
    const [suggestedProduct, setSuggestedProduct] = useState();

    const chooseSuggestedProduct = (curProd) => {
        const index = Math.floor(Math.random() * products.length);
        const suggestion = products[index];
        console.log(curProd);
        if (suggestion.id === curProd.id) {
            chooseSuggestedProduct(curProd);
        } else {
            setSuggestedProduct(suggestion);
        }
    };

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
            chooseSuggestedProduct(data);
        };
        wrapper();
    }, [updated, id]);

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
                    <p>{product.description}</p>
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

                {suggestedProduct && (
                    <div>
                        <h2>You may also like: </h2>
                        <SuggestedCard
                            productName={suggestedProduct.name}
                            image={suggestedProduct.imageUrl}
                            unitPrice={suggestedProduct.unitPrice}
                            id={suggestedProduct.id}
                            quantity={suggestedProduct.quantity}
                        />
                    </div>
                )}
            </div>
        </div>
    ) : (
        <p>Loading Please Wait</p>
    );
};

export default ProductPage;
