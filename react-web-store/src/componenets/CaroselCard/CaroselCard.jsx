import { NavLink } from "react-router-dom";
import styles from "./CaroselCard.module.scss";

const CaroselCard = ({ width, image, id }) => {
    return (
        <NavLink to={`/home/${id}`}>
            <div className={styles.CaroselCard} style={{ width: width }}>
                <img src={image}></img>
            </div>
        </NavLink>
    );
};

export default CaroselCard;
