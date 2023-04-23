import { useNavigate } from "react-router-dom";
import styles from "./CaroselCard.module.scss";

const CaroselCard = ({
    width,
    image,
    id,
    notCenter,
    nextItem,
    prevItem,
    next,
}) => {
    const navigate = useNavigate();
    // if central car when clicked will link to that items product page,
    // else will either move back or forward depending on position
    const handleClick = () => {
        if (notCenter > 0) {
            nextItem();
        } else if (notCenter < 0) {
            prevItem();
        } else {
            navigate(`/${id}`);
        }
    };
    return (
        <div
            key={Math.random()}
            className={`${styles.CaroselCard} ${
                !notCenter ? styles.Show : styles.Dampen
            } ${next ? styles.Next : styles.Previous}`}
            style={{ width: width }}
            onClick={handleClick}
        >
            <img src={image}></img>
        </div>
    );
};

export default CaroselCard;
