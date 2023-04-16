import { useState, useEffect } from "react";
import { getProductById } from "../../services/firebase/products";
import { useParams } from "react-router-dom";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useContext } from "react";

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { updateCartInventory } = useContext(CartInventoryContext);

    const { id } = useParams();

    const addToCart = () => {
        updateCartInventory(id);
    };

    useEffect(() => {
        const wrapper = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        wrapper();
    }, [id]);
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
                <button onClick={addToCart}>Add to Cart</button>
            </div>
        )
    );
};

export default ProductPage;
