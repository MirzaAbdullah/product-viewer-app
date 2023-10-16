/**
 * Base file to handle Axios via different dynamic properties
 * which in turns make this library as a universal solution
 *
 * Author: Muhammad Abdullah
 */
import axiosRetry from "axios-retry";
import axios from "axios";

import { logError } from "./logService";
import { ReadOnlyProps } from "../../utils/templates";

interface httpProps {
  baseURL?: string;
  type: string;
  path: string;
  body?: any;
  contentType?: string;
  isTokenRequired?: boolean;
  isAcceptHeaderRequired?: boolean;
}

export const httpClient = async ({
  baseURL,
  type,
  path,
  body,
  contentType = "application/json",
  isTokenRequired = true,
  isAcceptHeaderRequired = true,
}: ReadOnlyProps<httpProps>) => {
  //Setting base URL for application
  if (baseURL && baseURL !== "") {
    axios.defaults.baseURL = baseURL;
  }

  //Axios Common header
  axios.defaults.headers.common["Content-Type"] = contentType;
  if (isAcceptHeaderRequired) {
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  if (isTokenRequired) {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${await (
    //   await accessToken()
    // ).accessToken}`;
  }

  axiosRetry(axios, {
    retries: 3,
    retryDelay: () => 2000,
    retryCondition: () => true,
    onRetry(retryCount, error, requestConfig) {
      console.log(
        `Error: the endpoint ${error.config.url} is re-attempted ${retryCount} times to load using the network`
      );
    },
  });

  //Axios Interceptors
  axios.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        logError("You are not authorized");
      }
      return response;
    },
    (error) => {
      const expectedError =
        error &&
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        logError(error.message);
      }

      return Promise.reject(error.message);
    }
  );

  let axiosMethod: any = null;
  switch (type) {
    case "GET":
      axiosMethod = axios.get(path);
      break;
    case "POST":
      axiosMethod = axios.post(path, body);
      break;
    case "PUT":
      axiosMethod = axios.put(path, body);
      break;
    case "DELETE":
      axiosMethod = axios.delete(path);
      break;
  }

  return axiosMethod;
};
