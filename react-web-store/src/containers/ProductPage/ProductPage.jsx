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

    const addToCart = async () => {
        await updateCartInventory(id);
        updatePage();
    };

    useEffect(() => {
        const wrapper = async () => {
            const data = await getProductById(id);
            setProduct(data);
            console.log("update page");
        };
        wrapper();
    }, [id, updated]);

    console.log(product, "product");
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
