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

    const handleClick = (e) => {
        console.log("remove btn clicked");
        const currentItem = getItemById(id);
        setChangeInAmount(-currentItem.quantityInCart);
        updateCartInventory(id, -currentItem.quantityInCart);
        setFormValue(0);
        updatePage();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const currentProduct = await getProductById(id);
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
    console.log(changeInAmount, "Change in amount");
    console.log(cartInventory, "Cart Inventory");
    console.log(formValue, "forms current val");

    useEffect(() => {
        const wrapper = async () => {
            setCurrentProduct(await getProductById(id));
        };
        wrapper();
        setFormValueInitial();
    }, [cartInventory, update]);

    useEffect(() => {});
    // console.log(inCartQuantity, "inCartQunatity");
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
                        value={formValue}
                    />
                    <input
                        className={styles.UpdateCart}
                        type="submit"
                        value={"update cart"}
                    />
                    <button onClick={handleClick}>Remove From Cart</button>
                </form>
            </div>
        </section>
    );
};

export default CartCard;
