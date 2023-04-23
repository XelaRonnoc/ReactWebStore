import { useContext, useEffect, useState } from "react";
import CaroselCard from "../../componenets/CaroselCard/CaroselCard";
import styles from "./Carosel.module.scss";
import { ProductContext } from "../../context/ProductProvider";

const Carosel = () => {
    const [items, setItems] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { products } = useContext(ProductContext);
    const [updateFavs, setUpdateFavs] = useState(true);
    const [direction, setDirection] = useState(true);

    const nextItem = () => {
        const arrCopy = items;
        const frontEL = arrCopy.shift();
        arrCopy.push(frontEL);
        setItems(arrCopy);
        setActiveIndex(activeIndex + 1);
        setDirection(true);
    };

    const prevItem = () => {
        const arrCopy = items;
        const backEl = arrCopy.pop();
        arrCopy.unshift(backEl);
        setItems(arrCopy);
        setActiveIndex(activeIndex - 1);
        setDirection(false);
    };

    useEffect(() => {
        if (products && updateFavs) {
            const caroselItems = products.filter((prod) => {
                if (prod.favourited === true) {
                    return prod;
                }
            });
            setUpdateFavs(false);
            setItems(caroselItems);
        }
    }, [products, activeIndex]);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className={styles.Carosel}>
                <section
                    className={`${styles.Carosel_Inner} ${
                        direction
                            ? styles.Carosel_Inner_Next
                            : styles.Carosel_Inner_Previous
                    }`}
                >
                    {items &&
                        items.map((prod, index) => {
                            return (
                                <CaroselCard
                                    key={prod.id}
                                    image={prod.caroselImage}
                                    width="33%"
                                    notCenter={
                                        index - Math.floor(items.length / 2)
                                    }
                                    nextItem={nextItem}
                                    prevItem={prevItem}
                                    next={direction}
                                    id={prod.id}
                                />
                            );
                        })}
                </section>
                <div className={styles.Controls}>
                    <button onClick={prevItem}>Previous</button>
                    <button onClick={nextItem}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Carosel;
