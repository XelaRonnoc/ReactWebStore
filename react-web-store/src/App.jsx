import { useEffect, useState, useContext } from "react";
import ProductList from "./containers/ProductList/ProductList";
import { getAllProducts, addProduct } from "./services/firebase/products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./componenets/Nav/Nav";
import ProductPage from "./containers/ProductPage/ProductPage";
import Carosel from "./containers/Carosel/Carosel";
import CartInventoryProvider from "./context/CartInventoryProvider";
import Cart from "./containers/Cart/Cart";
import UpdateProvider, { UpdateContext } from "./context/UpdateProvider";

function App() {
    console.log(getAllProducts());
    const [products, setProducts] = useState(null);
    const { updated } = useContext(UpdateContext);

    useEffect(() => {
        const wrapper = async () => {
            const allProds = await getAllProducts();
            setProducts(allProds);
        };
        wrapper();
    }, [updated]);

    // console.log(products);
    return (
        <BrowserRouter>
            <UpdateProvider>
                <div className="App">
                    <CartInventoryProvider>
                        <Nav />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Carosel products={products} />
                                        <ProductList products={products} />
                                    </>
                                }
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/:id" element={<ProductPage />} />
                        </Routes>
                    </CartInventoryProvider>
                </div>
            </UpdateProvider>
        </BrowserRouter>
    );
}

export default App;
