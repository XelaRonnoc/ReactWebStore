import { useContext, useEffect } from "react";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
import { UpdateContext } from "../../context/UpdateProvider";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { ProductContext } from "../../context/ProductProvider";

const ProductList = () => {
    //container for all product cards
    const { initialCartInventory } = useContext(CartInventoryContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        initialCartInventory(products);
    }, [products]);

    return (
        <div>
            <h1>Product List from firestore</h1>
            <div className={styles.ProductList}>
                {products &&
                    products.map((prod) => {
                        return (
                            <ProductCard
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

export default ProductList;
