import React from "react";
import MenuBar from "./MenuBar";
import MobileMenuBar from "./MobileMenuBar";
import SearchBar from "./SearchBar";

const Header = () => {
    return (
        <header className="header">
            <div className="common-header">
                <MenuBar/>
                <SearchBar/>
            </div>
            
            <div className="mobile-header">
                <MobileMenuBar/>
            </div>
        </header>
        
    );
};
export default Header;