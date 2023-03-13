import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import ConfirmDialog from "../common/ConfirmDialog";
import Layout from "../common/layout";
import { hideLoader, showLoader } from "../common/Loader";
import SidebarFilter from "../common/SidebarFilter";
import SchoolCardGrid from "../components/SchoolCardGrid";
import { OPERATORS } from "../constants/app";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { getCurretLocation, getGeoLocationState, getLocalData, isEmpty, isLoggedIn, removeLocalDataItem, setLocalData } from "../utils/helper";
import RESTClient from "../utils/RestClient";

const AllSchools = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = useLocation();
  const { data } = state || {};

  const [schoolList, setSchoolList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latLong, setLatLong] = useState({});
  const [grantLocationPermissionDialog, setGrantLocationPermissionDialog] = useState(false);
  const defaultLocation = useSelector(
    (state) => state.locationData.selectedLocation
  );
  const grantlocationMessage = "You have blocked Campuscredo from tracking your location. To use this, enable your location settings in browser.";
  const selectedLocation = isLoggedIn() && !isEmpty(getLocalData("selectedLocation")) ? getLocalData("selectedLocation") : defaultLocation;
  const filterFormData = useSelector((state) => state.userData.schoolFilter);



  const getCurrentLatLong = async () => {
    const location = await getCurretLocation();
    setLatLong(location);
  };

  useEffect(() => {
    getCurrentLatLong();
    getSchoolList();
    window.scrollTo(0, 0);

  }, [location]);

  const closeGrantLocationDialog = () => {
    localStorage.removeItem("locationDialogPrompt");
    setGrantLocationPermissionDialog(false);
  };

  const applyFilters = async (formFilter) => {
    let locationPermission = await getGeoLocationState();
    if (!isEmpty(formFilter.distance) && !isNaN(formFilter.distance) && locationPermission.state === "denied") {
      setGrantLocationPermissionDialog(true);
      setLocalData("locationDialogPrompt", true);
      return;
    }
    localStorage.removeItem("locationDialogPrompt");
    try {
      showLoader(dispatch);
      setIsLoading(true);
      const response = await RESTClient.post(
        RestEndPoint.FIND_SCHOOLS,
        prepareSchoolFilter(formFilter)
      );

      setSchoolList(response.data);
      hideLoader(dispatch);
      setIsLoading(false);
    } catch (error) {
      hideLoader(dispatch);
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  const getSchoolList = async () => {
    removeLocalDataItem("SchoolDetailsLatitude");
    removeLocalDataItem("SchoolDetailsLongitude");
    const queryParams = new URLSearchParams(location.search);
    const schoolName = queryParams.get("name");
    let filters = [];
    if (schoolName !== null && schoolName !== "")
      filters.push({ field: "name", operator: "LIKE", value: schoolName });
    else filters = prepareSchoolFilter(filterFormData).filters;
    try {
      showLoader(dispatch);
      setIsLoading(true);
      let param = {};
      param.filters = filters;

      if (!isEmpty(data) && !isEmpty(data.schoolDetailsLatitude) && !isEmpty(data.schoolDetailsLongitude)) {
        let location = {};
        location.latitude = data.schoolDetailsLatitude;
        location.longitude = data.schoolDetailsLongitude;
        param.location = location;
      }
      const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, param);
      setSchoolList(response.data);
      hideLoader(dispatch);
      setIsLoading(false);
    } catch (error) {
      hideLoader(dispatch);
      setIsLoading(false);
    }
  };

  function prepareSchoolFilter(filterForm) {
    const selectedFacilities = filterForm.facilities?.map((v) => v.value);
    const selectedExtracurriculars = filterForm.extracurriculars?.map(
      (v) => v.value
    );
    let filterPayload = {};
    let filters = [];
    filters.push({
      field: "city",
      operator: OPERATORS.EQUALS,
      // value: getLocalData("selectedLocation"),
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

      if(getLocalData("cities").includes(getLocalData("currentLocation"))) {
        if (filterForm.distance) {
          filterPayload["radius"] = filterForm.distance;
        }
        if (!isEmpty(latLong) && !isEmpty(latLong.longitude) && !isEmpty(latLong.latitude)) {
          filterPayload["location"] = {
            longitude: latLong.longitude,
            latitude: latLong.latitude,
          };
        } 
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
                <SchoolCardGrid schools={schoolList} isLoading={isLoading} distanceFilter={filterFormData.distance ? filterFormData.distance : ""} />
              </Col>
            </Row>
          </Col>
        </Container>
      </section>
      <ConfirmDialog
        show={grantLocationPermissionDialog}
        message={grantlocationMessage}
        handleConfirm={closeGrantLocationDialog}
      />
    </Layout>
  );
};
export default AllSchools;
