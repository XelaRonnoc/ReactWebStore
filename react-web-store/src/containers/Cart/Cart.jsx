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
            const allProds = await getAllProducts();
            const inCart = allProds.filter((prod) => {
                if (cartInventory.includes(prod.id)) {
                    return prod;
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
                                key={prod.id}
                                productName={prod.name}
                                image={prod.imageUrl}
                                unitPrice={prod.unitPrice}
                                id={prod.id}
                                quantity={prod.quantity}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Cart;
