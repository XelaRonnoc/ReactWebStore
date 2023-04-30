import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <NavLink className={styles.Header} to="/ReactWebStore">
            <h1>AM Games</h1>{" "}
        </NavLink>
    );
};

export default Header;
