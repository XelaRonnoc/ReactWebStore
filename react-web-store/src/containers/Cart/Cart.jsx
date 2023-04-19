import { useState, useContext, useEffect } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getAllProducts } from "../../services/firebase/products";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import CartCard from "../../componenets/CartCard/CartCard";

const Cart = () => {
    const [products, setProducts] = useState(null);
    const { updateCartInventory, cartInventory } =
        useContext(CartInventoryContext);

    useEffect(() => {
        const wrapper = async () => {
            const inCart = cartInventory.filter((obj) => {
                if (obj.quantityInCart > 0) {
                    return obj.productsObj;
                }
            });
            setProducts(inCart);
        };
        wrapper();
    }, [cartInventory]);

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {products &&
                    products.map((prod) => {
                        return (
                            <CartCard
                                key={prod.productsObj.id}
                                productName={prod.productsObj.name}
                                image={prod.productsObj.imageUrl}
                                unitPrice={prod.productsObj.unitPrice}
                                id={prod.productsObj.id}
                                quantity={prod.productsObj.quantity}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Cart;
