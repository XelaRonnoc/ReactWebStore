import { useState, useEffect } from "react";
import { getProductById } from "../../services/firebase/products";
import { useParams } from "react-router-dom";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useContext } from "react";
import { UpdateContext } from "../../context/UpdateProvider";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { cartInventory, updateCartInventory } =
        useContext(CartInventoryContext);
    const { updated, updatePage } = useContext(UpdateContext);
    const { id } = useParams();
    const [available, setAvailable] = useState(false);

    const addToCart = async () => {
        if (product.quantity >= 1) {
            setAvailable(true);
            await updateCartInventory(id);
            updatePage();
        } else {
            setAvailable(false);
        }
    };

    useEffect(() => {
        const wrapper = async () => {
            const data = await getProductById(id);
            setProduct(data);
            setAvailable(data.quantity >= 1);
        };
        wrapper();
    }, [id, updated]);

    return (
        product && (
            <div>
                <img src={product.imageUrl} alt="" />
                <h1>{product.name}</h1>
                <p>${product.unitPrice}</p>
                <select>
                    <option value={product.platforms.XBox}>XBox</option>
                    <option value={product.platforms.pc}>PC</option>
                    <option value={product.platforms.ps5}>PS5</option>
                </select>
                <p>Number in Stock: {product.quantity}</p>
                <button onClick={addToCart} disabled={!available}>
                    Add to Cart
                </button>
                {!available && <p>Sorry This product is out of stock</p>}
            </div>
        )
    );
};

export default ProductPage;
