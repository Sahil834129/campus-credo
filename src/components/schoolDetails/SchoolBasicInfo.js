import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import FooterGraphic from "../../assets/img/footer-graphic.png";

const SchoolBasicInfo = (props) => {
    const schoolDetails = props.schoolDetails;

    function getAddressInfo() {
        let address = "";
        address = address.concat(schoolDetails.addressLine1).concat(", ").concat(schoolDetails.city).concat(", ").concat(schoolDetails.state).concat(" ").concat(schoolDetails.pincode || '');
        return address;
    }

    return (
        <div className='school-basic-info'>
            <div className='cell left '><span className='image-wrapper'><img src={FooterGraphic} alt="" /></span></div>
            <div className='cell right'>
                <ListGroup as="ul" className=''>
                    {/* <ListGroup.Item as="li"><strong>{schoolDetails.admissionInfo?.schoolName}</strong></ListGroup.Item> */}
                    {schoolDetails.addressLine1 ? <ListGroup.Item as="li"><span>Address:</span> <strong>{getAddressInfo()}</strong></ListGroup.Item> : ''}
                    {schoolDetails.websiteLink ? <ListGroup.Item as="li"><span>Website:</span> <a href={schoolDetails.websiteLink} target='_blank'><strong className='greentext'>{schoolDetails.websiteLink}</strong></a></ListGroup.Item> : ''}
                    {schoolDetails.contactNo ? <ListGroup.Item as="li"><span>Contact No. :</span> <strong>{schoolDetails.contactNo}</strong></ListGroup.Item> : ''}
                    {schoolDetails.email ? <ListGroup.Item as="li"><span>Email-ID:</span> <strong>{schoolDetails.email}</strong></ListGroup.Item> : ''}
                    {schoolDetails.monthlyFeeMin && schoolDetails.monthlyFeeMax ? <ListGroup.Item as="li"><span>Monthly Fees:</span> <strong className='greentext'>₹{schoolDetails.monthlyFeeMin} - ₹{schoolDetails.monthlyFeeMax}</strong></ListGroup.Item> : ''}
                    {/* <ListGroup.Item as="li"><span>Curriculum:</span> <strong>{schoolDetails.board}</strong></ListGroup.Item> */}
                </ListGroup>
            </div>
        </div>
    )
}

export default SchoolBasicInfo;