import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import { ToastContainer} from 'react-toastify';
import Loader from "./Loader";

const Layout = ({children}) => {
    
    return(
        <>
            <Loader/>
            <Container className="main-container" fluid>
                <Header/>
                {children}
                <Footer/>
            </Container>
            <ToastContainer autoClose={2000} position="top-right"/>
        </>
    );
};

export default Layout;