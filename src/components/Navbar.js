import React from "react";
import { Link } from "react-router-dom";
import "./Gallery/Gallery.css";

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <Link className="nav-item" to="/">
                        Start
                    </Link>
                    <Link className="nav-item" to="/Battle">
                        Battle
                    </Link>
                    <Link className="nav-item" to="/gallery">
                        Gallery
                    </Link>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
