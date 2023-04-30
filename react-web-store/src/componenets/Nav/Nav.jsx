import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

// just the nav bar
const Nav = () => {
    return (
        <nav className={styles.Nav}>
            <NavLink className={styles.Nav_Link} to="/ReactWebStore">
                Home
            </NavLink>
            <NavLink className={styles.Nav_Link} to="/ReactWebStore/cart">
                Cart
            </NavLink>
        </nav>
    );
};

export default Nav;
