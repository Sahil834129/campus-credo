import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "./RestClient";
import { getSchoolClassesData } from "./services";

export const combineArray = (arr) => {
  return [{ value: "", text: "Select Class" }].concat(
    arr.map((it) => ({ value: it, text: it }))
  );
};

export const populateCities = (stateId, setCityOptions) => {
  setCityOptions([{ text: "Select City", value: "" }])
  if (!stateId)
    return
  RESTClient.get(RestEndPoint.GET_STATE_CITIES + "/" + stateId)
    .then((response) => {
      let cities = [{ text: "Select City", value: "" }];
      if (response.data.success)
        setCityOptions(
          cities.concat(
            response.data.cities.map((it) => ({ value: it.id, text: it.name }))
          )
        );
    })
    .catch((error) => {
      console.log("Error while getting cities list" + error);
    });
};

export const populateSchool = (val, cityOptions, setSchoolOptions) => {
  const checkCity = val
  const tempCity = cityOptions.reduce((temp, curval) => {
    if (curval.value === parseInt(checkCity)) {
      temp = curval.text
    }
    return temp
  }, '')
  RESTClient.get(RestEndPoint.GET_CITIES_SCHOOL + "/" + tempCity)
    .then((response) => {
      let schools = [{ text: "Select School", value: "" }];
      if (response.data)
        setSchoolOptions(
          schools.concat(
            response.data.map((it) => ({ value: it.schoolId, text: it.schoolName }))
          )
        );
    })
    .catch(err => console.log(err))
}

export const populateClass = (val, setClassOptions) => {
  const checkSchool = val
  getSchoolClassesData(checkSchool)
    .then((response) => {
      console.log('response', response.data)
      let classes = [{ text: "Select Class", value: "" }];
      if (response.data)
        setClassOptions(
          classes.concat(
            response.data.map((it) => ({ value: it.classId, text: it.className }))
          )
        );
    })
    .catch(err => console.log(err))
}

export const handleStateChange = (objectSetterMethod, parentObject, stateCityObject) => {
  objectSetterMethod({
    ...parentObject,
    ...stateCityObject
  })
}
