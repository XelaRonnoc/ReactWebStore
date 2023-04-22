import { useContext, useEffect, useState } from "react";
import CaroselCard from "../../componenets/CaroselCard/CaroselCard";
import styles from "./Carosel.module.scss";
import { ProductContext } from "../../context/ProductProvider";

const Carosel = () => {
    const [items, setItems] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { products } = useContext(ProductContext);

    const nextItem = () => {
        if (activeIndex < items?.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const prevItem = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    useEffect(() => {
        if (products) {
            const caroselItems = products.filter((prod) => {
                if (prod.favourited === true) {
                    return prod;
                }
            });
            setItems(caroselItems);
        }
    }, [products]);

    // console.log(activeIndex);
    return (
        <div>
            <h1>Featured Products</h1>
            <div className={styles.Carosel}>
                <section
                    className={styles.Carosel_Inner}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {items &&
                        items.map((prod) => {
                            return (
                                <CaroselCard
                                    key={prod.id}
                                    image={prod.imageUrl}
                                    width="100%"
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
