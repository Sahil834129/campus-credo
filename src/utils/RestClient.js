import axios from "axios";
import { setUserHavePermission } from "../redux/actions/userAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import PageContent from "../resources/pageContent";
import { getLocalData, refreshAccessToken } from "../utils/helper";

let store;

export const injectStore = _store => {
  store = _store;
};

axios.defaults.baseURL = "https://api.escuelajs.co/api/"; //process.env.BASE_URL;
//export const baseURL = "http://122.176.70.111:70";
export const baseURL = "https://campus-credo-static-images.s3.ap-south-1.amazonaws.com/";
export const campuscredoUrl = "http://ec2-13-232-245-88.ap-south-1.compute.amazonaws.com";

export default class RESTClient {
  static async get(action, params) {
    return await axios.get(action, params);
  }

  static async getBlob(action) {
    return await axios.get(action, {
      responseType: "blob",
      timeout: 30000,
    });
  }
  static async postBlob(action, params) {
    return await axios.post(action, params, {
      responseType: "blob",
      timeout: 30000,
    });
  }

  static async post(action, params) {
    return await axios.post(action, params);
  }

  static async put(action, params) {
    return await axios.put(action, params);
  }

  static async patch(action, params) {
    return await axios.patch(action, params);
  }

  static async delete(action, params) {
    return await axios.delete(action, params);
  }

  static getAPIErrorMessage(error) {
    if (error.response && error.response.data) {
      let apiError = error.response.data.apierror;
      if (
        apiError &&
        apiError.hasOwnProperty("subErrors") &&
        apiError.subErrors.length > 0
      ) {
        return apiError.subErrors.map((it) => it.message).join(". "); //.join('<br/>')
      }
      return apiError?.message;
    }
    return PageContent.UNEXPECTED_ERROR_MSG;
  }
}

axios.interceptors.request.use(async (config) => {
  // Do something before request is sent
  config.baseURL = "http://122.176.70.111:8095/api";

  //config.baseURL = "http://ec2-13-232-245-88.ap-south-1.compute.amazonaws.com:8080/api";
  // config.baseURL = "http://59.144.164.132:8080/api/"; //process.env.BASE_URL;
  //config.baseURL = "https://campuscredo.com:8443/api";
  const token = await getLocalData("token");
  config.headers.common["Authorization"] = token ? "Bearer " + token : "";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 400) {
      return Promise.reject(response);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { response } = error;
    if (response.status === 401 && !originalRequest._retry && (originalRequest.url !== RestEndPoint.REFRESH_TOKEN)) {
      originalRequest._retry = true;
      const token = await refreshAccessToken();
      originalRequest.headers["Authorization"] = "Bearer " + token;
      return axios(originalRequest);
    }
    if (response.status === 403) {
      store.dispatch(setUserHavePermission(true));
    }
    return Promise.reject(error);
  }
);
