import { useState } from "react";
import "./App.css";
import { getAllProducts, addProduct } from "./services/firebase/products";

function App() {
    console.log(getAllProducts());

    return <div className="App"></div>;
}

export default App;
