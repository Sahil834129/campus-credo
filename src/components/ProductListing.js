import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent.js";
import {getProductList} from "../redux/actions/productActions";

const ProductListing = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts.products);
    
    useEffect(() => {
        dispatch(getProductList());
    }, [dispatch]);
    
    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    );
};

export default ProductListing;