import styles from "./CartCard.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useEffect } from "react";

const CartCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [inCartQuantity, setInCartQuantity] = useState(-1);
    const { cartInventory, updateCartInventory } =
        useContext(CartInventoryContext);
    const [formValue, setFormValue] = useState(-1);
    const [changeInAmount, setChangeInAmount] = useState(0);

    const setAmountInCart = () => {
        const itemsOfType = cartInventory.filter((item) => {
            if (item === id) {
                return item;
            }
        });

        setInCartQuantity(itemsOfType.length);
        setFormValue(itemsOfType.length);
    };

    // handles the changes in amounts well up to max and min, now up to figureing out how to store and send this stuff to the DB properly without it getting too jumbled, will take some thought and refactoring
    const handleChange = (e) => {
        setFormValue(e.target.value);
        // setInCartQuantity(inCartQuantity + changeInAmount)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValue >= 0 && formValue <= quantity) {
            setChangeInAmount(formValue - inCartQuantity);
        } else if (formValue < 0) {
            setChangeInAmount(-inCartQuantity);
            setFormValue(0);
        } else if (formValue > quantity) {
            setChangeInAmount(quantity - inCartQuantity);
            setFormValue(quantity);
        }

        await updateCartInventory(id, -changeInAmount);
        setAmountInCart();
    };
    console.log(inCartQuantity, "In Cart Quantity");
    console.log(changeInAmount, "Change in amount");
    console.log(cartInventory, "Cart Inventory");

    useEffect(() => {
        setAmountInCart();
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
                        min={0}
                        value={formValue}
                    />
                    <input type="submit" value={"update cart"} />
                </form>
            </div>
        </section>
    );
};

export default CartCard;
