import styles from "./CartCard.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { CartInventoryContext } from "../../context/CartInventoryProvider";
import { useEffect } from "react";
import { getProductById } from "../../services/firebase/products";
import { UpdateContext } from "../../context/UpdateProvider";

const CartCard = ({ productName, unitPrice, image, id, update }) => {
    const { cartInventory, updateCartInventory, getItemById } =
        useContext(CartInventoryContext);
    const [formValue, setFormValue] = useState(-1);
    const [changeInAmount, setChangeInAmount] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const { updatePage } = useContext(UpdateContext);

    // sets the form intput to current quantity in cart
    const setFormValueInitial = () => {
        const curItem = getItemById(id);
        setFormValue(curItem.quantityInCart);
    };

    // sets the change in amount from current quantity in cart to user input
    const handleChange = (e) => {
        setFormValue(e.target.value);
        const currentChange = e.target.value - getItemById(id).quantityInCart;
        setChangeInAmount(currentChange);
    };

    // removes item from cart
    const handleClick = (e) => {
        const currentItem = getItemById(id);
        setChangeInAmount(-currentItem.quantityInCart);
        updateCartInventory(id, -currentItem.quantityInCart);
        updatePage();
    };

    // updates the amount of the item in cart, will automatically reduce to maximum allowable amount if over
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentItem = getItemById(id);
        console.log(currentProduct.quantity, "quantity");

        if (currentItem.quantityInCart + changeInAmount <= 0) {
            setChangeInAmount(-currentItem.quantityInCart);
            updateCartInventory(id, -currentItem.quantityInCart);
            setFormValue(0);
            updatePage();
        } else if (currentProduct.quantity - formValue <= 0) {
            setChangeInAmount(currentProduct.quantity);
            setFormValue(currentProduct.quantity);
            updateCartInventory(
                id,
                currentProduct.quantity - currentItem.quantityInCart
            );
        } else {
            updateCartInventory(id, changeInAmount);
        }
    };

    useEffect(() => {
        const wrapper = async () => {
            setCurrentProduct(await getProductById(id));
        };
        wrapper();
        setFormValueInitial();
    }, [cartInventory, update]);

    useEffect(() => {});
    return (
        <section className={styles.Card}>
            <div className={styles.Card_Product}>
                <NavLink to={`/${id}`}>
                    <img className={styles.Card_Image} src={image}></img>
                    <h3>{productName}</h3>
                    <p>${unitPrice}</p>
                </NavLink>
            </div>
            <div>
                <form className={styles.Card_Form} onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type="number"
                        min="1"
                        value={formValue}
                    />
                    <input
                        className={styles.UpdateCart}
                        type="submit"
                        value={"update cart"}
                    />
                    <p>For: {getItemById(id).system}</p>

                    <button onClick={handleClick}>Remove From Cart</button>
                </form>
            </div>
        </section>
    );
};

export default CartCard;
