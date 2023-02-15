import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import { hideLoader, showLoader } from "../common/Loader";
import SidebarFilter from "../common/SidebarFilter";
import SchoolCardGrid from "../components/SchoolCardGrid";
import { OPERATORS } from "../constants/app";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const AllSchools = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [schoolList, setSchoolList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const selectedLocation = useSelector(
    (state) => state.locationData.selectedLocation
  );
  const filterFormData = useSelector((state) => state.userData.schoolFilter);
  const geoLocation = useSelector((state) => state.locationData.geolocation);

  useEffect(() => {
    getSchoolList();
  }, [location]);

  const applyFilters = async (formFilter) => {
    try {
      showLoader(dispatch);
      setIsLoading(true)
      const response = await RESTClient.post(
        RestEndPoint.FIND_SCHOOLS,
        prepareSchoolFilter(formFilter, geoLocation)
      );
      setSchoolList(response.data);
      hideLoader(dispatch);
      setIsLoading(false)
    } catch (error) {
      hideLoader(dispatch);
      setIsLoading(false)
    }
    window.scrollTo(0, 0);
  };

  const getSchoolList = async () => {
    const queryParams = new URLSearchParams(location.search);
    const schoolName = queryParams.get("name");
    let filters = [];
    if (schoolName !== null && schoolName !== "")
      filters.push({ field: "name", operator: "LIKE", value: schoolName });
    else filters = prepareSchoolFilter(filterFormData, geoLocation).filters;

    try {
      showLoader(dispatch);
      setIsLoading(true)
      const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, {
        filters: filters,
      });
      setSchoolList(response.data);
      hideLoader(dispatch);
      setIsLoading(false)
    } catch (error) {
      hideLoader(dispatch);
      setIsLoading(false)
    }
  };

  function prepareSchoolFilter(filterForm, geolocation) {
    console.log(filterForm);
    const selectedFacilities = filterForm.facilities?.map((v) => v.value);
    const selectedExtracurriculars = filterForm.extracurriculars?.map(
      (v) => v.value
    );
    let filterPayload = {};
    let filters = [];
    filters.push({
      field: "city",
      operator: OPERATORS.EQUALS,
      value: selectedLocation,
    });
    if (filterForm.class)
      filters.push({
        field: "classes",
        operator: OPERATORS.IN,
        values: [filterForm.class],
      });
    if (filterForm.board)
      filters.push({
        field: "board",
        operator: OPERATORS.EQUALS,
        value: filterForm.board,
      });
    if (filterForm.gender)
      filters.push({
        field: "gender",
        operator: OPERATORS.LIKE,
        value: filterForm.gender,
      });
    if (filterForm.medium)
      filters.push({
        field: "mediumOfInstruction",
        operator: OPERATORS.LIKE,
        value: filterForm.medium,
      });
    if (selectedFacilities && selectedFacilities.length)
      filters.push({
        field: "facilities",
        operator: OPERATORS.IN,
        values: selectedFacilities,
      });
    if (selectedExtracurriculars && selectedExtracurriculars.length)
      filters.push({
        field: "extracurriculars",
        operator: OPERATORS.IN,
        values: selectedExtracurriculars,
      });
    let maxFee =
      filterForm.maxMonthlyTutionFee > 0
        ? filterForm.maxMonthlyTutionFee
        : 20000;
    let minFee =
      filterForm.minMonthlyTutionFee > 0 ? filterForm.minMonthlyTutionFee : 0;
    filters.push({
      field: "fee",
      operator: OPERATORS.BETWEEN,
      values: [minFee, maxFee],
    });
    if (filterForm.status)
      filters.push({
        field: "status",
        operator: OPERATORS.LIKE,
        value: filterForm.status,
      });

      if(geoLocation.cityName===selectedLocation)
     {
    if (geoLocation.longitude)
      filterPayload["location"] = {
        longitude: geoLocation.longitude,
        latitude: geoLocation.latitude,
      }
    }
    if (filterForm.distance) {
      filterPayload["radius"] = filterForm.distance;
    }
    filterPayload["filters"] = filters;
    return filterPayload;
  }

  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner internal-page-wrapper">
          <Col className="inner-page-content left">
            <SidebarFilter
              filterFormData={filterFormData}
              applyFilters={applyFilters}
            />
          </Col>
          <Col className="inner-page-content allschool-wrap right">
            <Row className="content-section">
              <Breadcrumbs />
              <Col className="page-container">
                <SchoolCardGrid schools={schoolList} isLoading={isLoading} />
              </Col>
            </Row>
          </Col>
        </Container>
      </section>
    </Layout>
  );
};
export default AllSchools;
