import { createContext, useState } from "react";

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();

    // allows for global utilistion of the items in the db without always having to go back to ask db
    const updateProducts = (prods) => {
        setProducts(prods);
    };

    const data = { products, updateProducts };
    return (
        <ProductContext.Provider value={data}>
            {children}
        </ProductContext.Provider>
    );
};

export const ProductContext = createContext();

export default ProductProvider;
