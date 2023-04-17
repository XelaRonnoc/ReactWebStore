import styles from "./CartCard.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useEffect } from "react";

const CartCard = ({ productName, unitPrice, image, id, quantity }) => {
    const [inCartQuantity, setInCartQuantity] = useState(-1);
    const { cartInventory } = useContext(CartInventoryContext);
    const [formValue, setFormValue] = useState(-1);

    const setAmountInCart = () => {
        const itemsOfType = cartInventory.filter((item) => {
            if (item === id) {
                return item;
            }
        });

        setInCartQuantity(itemsOfType.length);
        setFormValue(itemsOfType.length);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        let changeInAmount = 0;
        if (e.target.value >= 0 && e.target.value <= quantity) {
            setFormValue(value);
            changeInAmount = value - inCartQuantity;
            console.log(changeInAmount, "changeInAmount normal use");
        } else if (e.target.value < 0) {
            changeInAmount = -inCartQuantity;
            setFormValue(0);
            // setAmountInCart(0);
            console.log(changeInAmount, "changeInAmount negative");
        } else if (e.target.value > quantity) {
            changeInAmount = quantity - inCartQuantity;
            setFormValue(quantity);
            // setAmountInCart(quantity);
            console.log(changeInAmount, "changeInAmount more than available");
        }
        // setInCartQuantity(inCartQuantity + changeInAmount)
    };

    useEffect(() => {
        setAmountInCart();
    }, []);

    useEffect(() => {});
    console.log(inCartQuantity, "inCartQunatity");
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
                <input
                    onChange={handleChange}
                    type="number"
                    min={0}
                    value={formValue}
                />
            </div>
        </section>
    );
};

export default CartCard;
