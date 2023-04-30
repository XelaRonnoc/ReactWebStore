import { useEffect, useContext } from "react";
import ProductList from "../ProductList/ProductList";
import { getAllProducts } from "../../services/firebase/products";
import { Routes, Route } from "react-router-dom";
import Nav from "../../componenets/Nav/Nav";
import ProductPage from "../../containers/ProductPage/ProductPage";
import Carosel from "../Carosel/Carosel";
import Cart from "../../containers/Cart/Cart";
import { UpdateContext } from "../../context/UpdateProvider";
import Header from "../../componenets/Header/Header";
import styles from "./Main.module.scss";
import { ProductContext } from "../../context/ProductProvider";

function Main() {
    // holds stuff, allows for easier utilisation of context early in app mounting
    const { products, updateProducts } = useContext(ProductContext);
    // const { updated } = useContext(UpdateContext);

    useEffect(() => {
        const wrapper = async () => {
            const allProds = await getAllProducts();
            updateProducts(allProds);
        };
        wrapper();
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.Main_Header}>
                <Header />
                <Nav />
            </div>
            <div className={styles.Main_Body}>
                <Routes>
                    <Route
                        path="/ReactWebStore"
                        element={
                            <>
                                {products ? (
                                    <Carosel />
                                ) : (
                                    <p>Loading Please Wait</p>
                                )}
                                {products ? (
                                    <ProductList />
                                ) : (
                                    <p>Loading Please Wait</p>
                                )}
                            </>
                        }
                    />
                    {/* <Route
                        path="/"
                        element={
                            <>
                                {products ? (
                                    <Carosel />
                                ) : (
                                    <p>Loading Please Wait</p>
                                )}
                                {products ? (
                                    <ProductList />
                                ) : (
                                    <p>Loading Please Wait</p>
                                )}
                            </>
                        }
                    /> */}
                    <Route path="/ReactWebStore/cart" element={<Cart />} />
                    <Route
                        path="/ReactWebStore/:id"
                        element={<ProductPage />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default Main;
