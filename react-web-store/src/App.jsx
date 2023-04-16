import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import ProductList from "./containers/ProductList/ProductList";
import { getAllProducts, addProduct } from "./services/firebase/products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./componenets/Nav/Nav";
import ProductPage from "./containers/ProductPage/ProductPage";
import Carosel from "./containers/Carosel/Carosel";
import CartInventoryProvider from "./context/CartInventoryProvider";
import Cart from "./containers/Cart/Cart";

function App() {
    console.log(getAllProducts());
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const wrapper = async () => {
            const allProds = await getAllProducts();
            setProducts(allProds);
        };
        wrapper();
    }, []);

    // console.log(products);
    return (
        <div className="App">
            <CartInventoryProvider>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route
                            path="/home"
                            element={
                                <>
                                    <Carosel products={products} />
                                    <ProductList products={products} />
                                </>
                            }
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/home/:id" element={<ProductPage />} />
                    </Routes>
                </BrowserRouter>
            </CartInventoryProvider>
        </div>
    );
}

export default App;
