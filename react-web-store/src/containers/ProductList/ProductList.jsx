import React from "react";
import ProductCard from "../../componenets/ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const ProductList = ({ products }) => {
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
