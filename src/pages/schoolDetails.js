import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Layout from '../common/layout';
import Breadcrumbs from '../common/Breadcrumbs';
import RESTClient from '../utils/RestClient';
import RestEndPoint from '../redux/constants/RestEndpoints';
import SchoolStats from '../components/schoolDetails/SchoolStats';
import SchoolBasicInfo from '../components/schoolDetails/SchoolBasicInfo';
import SchoolDetailTitle from '../components/schoolDetails/SchoolDetailTitle';
import SchoolFacilities from '../components/schoolDetails/SchoolFacilities';
import SchoolDetailFeeStructure from '../components/schoolDetails/SchoolDetailFeeStructure';
import ApplyToSchool from '../components/schoolDetails/ApplyToSchool';
import Description from '../components/Description';
import PageContent from '../resources/pageContent';
import Desclaimer from '../components/Desclaimer';
import NearBySchools from '../components/NearBySchools';
import { isLoggedIn } from '../utils/helper';

const SchoolDetails = () => {
	const location = useLocation();
	const [schoolDetails, setSchoolDetails] = useState({});
	const [schoolCategoryFacilitiesMap, setSchoolCategoryFacilitiesMap] = useState({});
	const queryParams = new URLSearchParams(location.search);
	const schoolId = atob(queryParams.get("id")).replace("#", "");

	useEffect(() => {
		fetchSchoolDetails(schoolId);
	}, [schoolId]);

	const fetchSchoolDetails = async (schoolId) => {
		try {
			const response = await RESTClient.get(RestEndPoint.SCHOOL_BY_ID + "/" + schoolId);
			let schoolDetails = response.data;
			let categoryFaciltiesMap = {};
			setSchoolDetails(schoolDetails);
			schoolDetails.facilities.map(facility => {
				if (!categoryFaciltiesMap.hasOwnProperty(facility.category))
					categoryFaciltiesMap[facility.category] = [];
				categoryFaciltiesMap[facility.category].push(facility.facilityName);
			});
			setSchoolCategoryFacilitiesMap(categoryFaciltiesMap);
		} catch (e) {
			console.log("error : " + e);
		}
	};
	return (
		<Layout>
			<section className="content-area">
				<Container className="content-area-inner internal-page-wrapper school-details-wrap">
					<Col className='inner-page-content left'>
						<Row className='content-section'>
							<Breadcrumbs />
							<Col className='page-container'>
								{
									console.log("here " ,schoolDetails )
								}
								<SchoolDetailTitle schoolName={schoolDetails.schoolName} establishYear={schoolDetails.yearEstablishedIn} />
								<div className='school-details-container'>
									<SchoolBasicInfo schoolDetails={schoolDetails} />
									{isLoggedIn() && schoolDetails.hasOwnProperty("admissionInfo") ?
										<ApplyToSchool schoolId={schoolId} schoolDetails={schoolDetails} />
										: ''
									}
									<div className='academic-stat-wrapper'>
										<Col className='about-school-wrap'>
											{schoolDetails.aboutSchool && <Description heading="About School" description={schoolDetails.aboutSchool} />}
										</Col>
										<SchoolStats schoolDetails={schoolDetails} />
										<Col className='facilities-list'>
											<SchoolFacilities schoolCategoryFacilitiesMap={schoolCategoryFacilitiesMap} />
										</Col>
										{/* <Col className='fee-structure-wrap'>
											<SchoolDetailFeeStructure />
										</Col> */}
										<Col className='about-school-wrap'>
											{ schoolDetails.curriculamInfra ? <Description heading="Curriculum & Infrastructure" description={schoolDetails.curriculamInfra} /> :''}
											{ schoolDetails.achievements ? <Description heading="Achievements" description={schoolDetails.achievements} /> : ''}
										</Col> 
										<Col>
											<Desclaimer heading={PageContent.SCHOOL_DTL_DISCLAIMER.heading} description={PageContent.SCHOOL_DTL_DISCLAIMER.description} />
										</Col>
									</div>
								</div>
							</Col>
						</Row>
					</Col>
					<Col className='inner-page-content right'>
						<NearBySchools />
					</Col>
				</Container>
			</section>
		</Layout>
	);
};

export default SchoolDetails;