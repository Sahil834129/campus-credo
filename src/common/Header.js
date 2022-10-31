import React from "react";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";

const Header = () => {
    return (
        <header className="header">
            <MenuBar/>
            <SearchBar/>
        </header>
    );
};
export default Header;