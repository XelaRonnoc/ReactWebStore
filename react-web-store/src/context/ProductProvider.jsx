import { createContext, useState } from "react";

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState();

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
