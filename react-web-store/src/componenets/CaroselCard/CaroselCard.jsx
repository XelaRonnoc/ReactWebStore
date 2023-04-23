import { NavLink, useNavigate } from "react-router-dom";
import styles from "./CaroselCard.module.scss";
import { useEffect } from "react";

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
        // <NavLink to={!notCenter ? `/${id}` : `/`}>
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
        // </NavLink>
    );
};

export default CaroselCard;
