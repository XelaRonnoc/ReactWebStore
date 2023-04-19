import { useContext, useEffect } from "react";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
import { UpdateContext } from "../../context/UpdateProvider";
import { CartInventoryContext } from "../../context/CartInventoryProvider";

const ProductList = ({ products }) => {
    const { update, updatePage } = useContext(UpdateContext);
    const { initialCartInventory } = useContext(CartInventoryContext);

    useEffect(() => {
        initialCartInventory(products);
        console.log("setting cart inventory");
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
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default ProductList;
