import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </nav>
    );
};

export default Nav;
