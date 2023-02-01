import React from "react";
import { Link } from "react-router-dom";

const Desclaimer = (props) => {
    return (
        <div className="disclaimer">
            <blockquote>
                <h4>{props.heading}</h4>
                <h6>{props.description}</h6>
                  <h6 className='linkback-cell left '>For more Details , Please read our <Link to={"/disclaimerPolicy"}  className=" text-danger">Disclaimer Policy</Link></h6>
            </blockquote>
        </div>
    )
}

export default Desclaimer;