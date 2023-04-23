import { useEffect, useState, useContext } from "react";
import ProductList from "./containers/ProductList/ProductList";
import { getAllProducts, addProduct } from "./services/firebase/products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./componenets/Nav/Nav";
import ProductPage from "./containers/ProductPage/ProductPage";
import Carosel from "./containers/Carosel/Carosel";
import CartInventoryProvider, {
    CartInventoryContext,
} from "./context/CartInventoryProvider";
import Cart from "./containers/Cart/Cart";
import UpdateProvider, { UpdateContext } from "./context/UpdateProvider";
import Header from "./componenets/Header/Header";
import styles from "./App.module.scss";
import ProductProvider from "./context/ProductProvider";
import Main from "./containers/Main/Main";

function App() {
    // console.log(getAllProducts());
    const { updated } = useContext(UpdateContext);

    useEffect(() => {}, [updated]);

    // useEffect(() => {
    //     initialCartInventory(products);
    // }, [products]);

    // console.log(products);

    return (
        <BrowserRouter>
            <ProductProvider>
                <CartInventoryProvider>
                    <UpdateProvider>
                        <Main />
                        {/* <div className={styles.App}>
                            <div className={styles.App_Header}>
                                <Header />
                                <Nav />
                            </div>
                            <div className={styles.App_Body}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                {products ? (
                                                    <Carosel
                                                        products={products}
                                                    />
                                                ) : (
                                                    <p>Loading Please Wait</p>
                                                )}
                                                {products ? (
                                                    <ProductList
                                                        products={products}
                                                    />
                                                ) : (
                                                    <p>Loading Please Wait</p>
                                                )}
                                            </>
                                        }
                                    />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route
                                        path="/:id"
                                        element={<ProductPage />}
                                    />
                                </Routes>
                            </div>
                        </div> */}
                    </UpdateProvider>
                </CartInventoryProvider>
            </ProductProvider>
        </BrowserRouter>
    );
}

export default App;
