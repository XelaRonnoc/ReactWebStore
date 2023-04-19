import styles from "./CartCard.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useEffect } from "react";
import { getProductById } from "../../services/firebase/products";

const CartCard = ({ productName, unitPrice, image, id }) => {
    const { cartInventory, updateCartInventory, getItemById } =
        useContext(CartInventoryContext);
    const [formValue, setFormValue] = useState(-1);
    const [changeInAmount, setChangeInAmount] = useState(0);

    const setFormValueInitial = () => {
        const curItem = getItemById(id);
        setFormValue(curItem.quantityInCart);
    };

    // handles the changes in amounts well up to max and min, now up to figureing out how to store and send this stuff to the DB properly without it getting too jumbled, will take some thought and refactoring
    const handleChange = (e) => {
        setFormValue(e.target.value);
        const currentChange = e.target.value - getItemById(id).quantityInCart;
        setChangeInAmount(currentChange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentProduct = await getProductById(id);
        const currentItem = getItemById(id);
        console.log(currentProduct.quantity, "quantity");

        if (currentItem.quantityInCart + changeInAmount < 0) {
            setChangeInAmount(-currentItem.quantityInCart);
            updateCartInventory(id, -currentItem.quantityInCart);
            setFormValue(0);
        } else if (currentProduct.quantity - changeInAmount < 0) {
            setChangeInAmount(currentProduct.quantity);
            setFormValue(currentProduct.quantity);
            updateCartInventory(id, currentProduct.quantity);
        } else {
            updateCartInventory(id, changeInAmount);
        }
    };
    console.log(changeInAmount, "Change in amount");
    console.log(cartInventory, "Cart Inventory");
    console.log(formValue, "forms current val");

    useEffect(() => {
        setFormValueInitial();
    }, []);

    useEffect(() => {});
    // console.log(inCartQuantity, "inCartQunatity");
    return (
        <section className={styles.Card}>
            <div>
                <NavLink to={`/${id}`}>
                    <img className={styles.Card_Image} src={image}></img>
                    <h3>{productName}</h3>
                    <p>${unitPrice}</p>
                </NavLink>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type="number"
                        value={formValue}
                    />
                    <input type="submit" value={"update cart"} />
                </form>
            </div>
        </section>
    );
};

export default CartCard;
