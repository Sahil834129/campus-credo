import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import FooterGraphic from "../../assets/img/footer-graphic.png";

const SchoolBasicInfo = (props) => {
    const schoolDetails = props.schoolDetails;

    function getAddressInfo() {
		let address = "";
		address = address.concat(schoolDetails.addressLine1).concat(",").concat(schoolDetails.city).concat(",").concat(schoolDetails.state).concat(" ").concat(schoolDetails.pincode)
		return address;
	}

    return (
        <div className='school-basic-info'>
            <div className='cell left '><span className='image-wrapper'><img src={FooterGraphic} alt="" /></span></div>
            <div className='cell right'>
                <ListGroup as="ul" className=''>
                    <ListGroup.Item as="li">{getAddressInfo()}</ListGroup.Item>
                    <ListGroup.Item as="li"><strong>Mr. RadheyShyam Munjal (Principal)</strong></ListGroup.Item>
                    <ListGroup.Item as="li"><span>Curriculum:</span> <strong>{schoolDetails.board}</strong></ListGroup.Item>
                    <ListGroup.Item as="li"><span>Monthly Fees:</span> <strong className='greentext'>₹{schoolDetails.monthlyFeeMin} - ₹{schoolDetails.monthlyFeeMax}</strong></ListGroup.Item>
                    <ListGroup.Item as="li"><span>Gender:</span> <strong>{schoolDetails.gender}</strong></ListGroup.Item>
                    <ListGroup.Item as="li"><span>Postal Code:</span> <strong>{schoolDetails.pincode}</strong></ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}

export default SchoolBasicInfo;