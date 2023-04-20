import { useState, useContext, useEffect } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { getAllProducts } from "../../services/firebase/products";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import CartCard from "../../componenets/CartCard/CartCard";
import { UpdateContext } from "../../context/UpdateProvider";

const Cart = () => {
    const [products, setProducts] = useState(null);
    const { updateCartInventory, cartInventory, purchaseItemsInCart } =
        useContext(CartInventoryContext);
    // const [updated, setUpdated] = useState(0);
    const { updatePage, updated } = useContext(UpdateContext);

    const handleClick = (e) => {
        e.preventDefault();
        purchaseItemsInCart();
        updatePage();
    };

    useEffect(() => {
        const wrapper = async () => {
            const inCart = cartInventory.filter((obj) => {
                if (obj.quantityInCart > 0) {
                    return obj.productsObj;
                }
            });
            setProducts(inCart);
        };
        console.log("Cart Page refreshing");
        wrapper();
    }, [cartInventory, updated]);

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
                                update={updated}
                            />
                        );
                    })}
            </div>
            <form>
                <button onClick={handleClick}>Purchase</button>
            </form>
        </div>
    );
};

export default Cart;
