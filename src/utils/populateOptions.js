import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "./RestClient";

export const combineArray = (arr) => {
  return [{ value: "", text: "Select Class" }].concat(
    arr.map((it) => ({ value: it, text: it }))
  );
};

export const populateCities = (stateId, setCityOptions) => {
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
