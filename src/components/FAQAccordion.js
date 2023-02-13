import React from "react";
import Accordion from 'react-bootstrap/Accordion';

const FAQAccordion = () => {
    return (
        <div className='facilities-list faq'>
            <h2>Frequently Asked Questions</h2>
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What is the age criteria for admissions in Your Global School?</Accordion.Header>
                    <Accordion.Body>
                        FAQ details
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Is transportation facility available in Richmond Global School, Begaluru?</Accordion.Header>
                    <Accordion.Body>
                        
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default FAQAccordion;