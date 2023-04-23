import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import CartInventoryProvider from "./context/CartInventoryProvider";
import UpdateProvider, { UpdateContext } from "./context/UpdateProvider";
import ProductProvider from "./context/ProductProvider";
import Main from "./containers/Main/Main";

function App() {
    const { updated } = useContext(UpdateContext);

    useEffect(() => {}, [updated]);

    return (
        <BrowserRouter>
            <ProductProvider>
                <CartInventoryProvider>
                    <UpdateProvider>
                        <Main />
                    </UpdateProvider>
                </CartInventoryProvider>
            </ProductProvider>
        </BrowserRouter>
    );
}

export default App;
