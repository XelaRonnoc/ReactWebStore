import { NavLink } from "react-router-dom";
import styles from "./CaroselCard.module.scss";

const CaroselCard = ({ width, image, id }) => {
    return (
        <div className={styles.CaroselCard} style={{ width: width }}>
            <img src={image}></img>
        </div>
    );
};

export default CaroselCard;
