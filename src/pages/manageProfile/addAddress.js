import { Form, Formik } from "formik";
import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/form/InputField";
import { UserLocationSchema } from "../../data/validationSchema";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import RESTClient from "../../utils/RestClient";
import { getLocalData, isEmpty, setLocalData } from "../../utils/helper";
import MapAddress from "./mapAddress";

export default function AddAddress({ setKey, cityOptions, cities, userDetails, setUserDetails, populateCities }) {
  const queryParams = new URLSearchParams(window.location.search);
  const [submitting, setSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [defaultLatLng, setDefaultLatLng] = useState({ lat: '', lng: '' });
  const navigate = useNavigate();

  const manageAddress = queryParams.get("manageAddress");

  const [userLocation, setUserLocation] = useState({
    city: "",
    state: "",
    userLocationId: ""
  });

  const [stateOptions, setStateOptions] = useState([
    { text: "Select State", value: "" },
  ]);

  const checkHomeAddress = () => {
    if (!isEmpty(manageAddress))
      setKey("addAdress");
  };

  const saveUserAddress = async (formData, data) => {
    setSubmitting(true);
    let postData = {
      latitude: formData?.lat,
      longitude: formData?.lng
    };
    if (isEmpty(getLocalData("userLocation"))) {
      RESTClient.post(RestEndPoint.SAVE_USER_ADDRESS, postData)
        .then((response) => {
          toast.success("Address Saved Successfully");
          setSubmitting(false);
          navigate("/manageProfile");
          setLocalData("userLocation", response.data.cityName);
          setLocalData("userLatitude", response.data.latitude);
          setLocalData("userLongitude", response.data.longitude);
          setUserLocation({
            ...userLocation,
          });
          getUserLocation();
        })
        .catch((error) => {
          setSubmitting(false);
          toast.error(RESTClient.getAPIErrorMessage(error));
        });
    } else {
      postData = {
        ...postData,
        userLocationId: data.userLocationId
      }
      RESTClient.put(RestEndPoint.UPDATE_USER_LOCATION, postData)
        .then((response) => {
          const cities = getLocalData('cities').split(',');
          const isCityExist = cities.find(val => val.toLowerCase() === response.data.cityName.toLowerCase())
          if(isCityExist === undefined) {
            setLocalData("selectedLocation", 'Kolkata');
            setLocalData("userLocation", 'Kolkata');
          } else {
            setLocalData("selectedLocation", response.data.cityName);
            setLocalData("userLocation", response.data.cityName);
          }
          setLocalData("userLocation", response.data.cityName);
          toast.success("Location Updated Successfully");
          setSubmitting(false);
          
          setLocalData("userLatitude", response.data.latitude);
          setLocalData("userLongitude", response.data.longitude);
          navigate("/manageProfile");
          setUserDetails({
            ...userDetails,
          });
        })
        .catch((error) => {
          setSubmitting(false);
          toast.error(RESTClient.getAPIErrorMessage(error));
        });
    }
  };

  const populateStateList = () => {
    RESTClient.get(RestEndPoint.GET_STATE)
      .then((response) => {
        let states = [{ text: "Select State", value: "" }];
        if (response.data.success)
          setStateOptions(
            states.concat(
              response.data.states.map((it) => ({
                value: it.id,
                text: it.name,
              }))
            )
          );
      })
      .catch((error) => {
        console.log("Error while getting state list" + error);
      });
  };

  async function getUserLocation() {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_USER_LOCATION);
      populateCities(response.data[0].state);
      setUserLocation({
        ...userLocation,
        city: parseInt(response.data[0].city),
        state: (response.data[0].state),
        userLocationId: response.data[0].userLocationId,
      });
      setShowMap(true)
      setDefaultLatLng({ lat: parseFloat(response.data[0].latitude), lng: parseFloat(response.data[0].longitude) });
    }
    catch (error) { }
  }

  const drag = e => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setDefaultLatLng({ lat, lng });
  };

  useEffect(() => {
    populateStateList();
    checkHomeAddress();
    getUserLocation();
  }, []);

  useEffect(() => {
    console.log(defaultLatLng);
  }, [defaultLatLng]);
  return (
    <>
      <Formik
        initialValues={userLocation}
        validationSchema={UserLocationSchema}
        validateOnBlur
        enableReinitialize={true}
        onSubmit={(values) => {
          const selectedCity = cities.find(val => val.id === parseInt(values.city));
          setDefaultLatLng({ lat: parseFloat(selectedCity.latitude), lng: parseFloat(selectedCity.longitude) });
          setShowMap(true);
        }}
      >
        {({ values, resetForm, errors, touched, setFieldValue }) => (
          < Form className="location-frm row g-4 mb-3">
            <div className="col-md-5">
              <InputField
                fieldName="state"
                value={values.state}
                label="State"
                fieldType="select"
                placeholder=""
                selectOptions={stateOptions}
                onChange={(e) => {
                  setFieldValue('state', e.target.value);
                  setFieldValue("city", "");
                  populateCities(e.target.value);
                }}
                errors={errors}
                touched={touched}
                required
              />
            </div>
            <div className="col-md-5">
              <InputField
                fieldName="city"
                label="City"
                value={values.city}
                fieldType="select"
                placeholder=""
                required
                selectOptions={cityOptions}
                errors={errors}
                touched={touched}
              />
            </div>

            <div className="form-group col-md-2 button-wrap">
              <button
                className="save comn"
                type="submit"
                disabled={submitting}
              >
                Go
              </button>
            </div>

          </Form>
        )}
      </Formik>
      {showMap && defaultLatLng.lat && defaultLatLng.lng && (<>
      <div className="map-wrapper">
        <MapAddress
          isMarkerShown
          setDefaultLatLng={setDefaultLatLng}
          lat={defaultLatLng.lat}
          lng={defaultLatLng.lng}
          drag={drag}
        />
        </div>
        <div className="form-group mb-3 button-wrap" style={{ marginTop: 42 }}>
          <button
            className="save comn"
            type="button"
            disabled={submitting}
            onClick={ _ => saveUserAddress(defaultLatLng, userLocation)}
          >
            {(userLocation?.userLocationId && userLocation?.userLocationId !== "")  ? 'Update': 'Save'}
          </button>
        </div>
      </>)
      }
    </>
  );
}