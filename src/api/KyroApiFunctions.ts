import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

export class KyroApiFunctions {
  private static axios: AxiosInstance;

  public static init = () => {
    KyroApiFunctions.axios = axios.create({
      baseURL: "https://kyro-user-service-mgmqxruica-uc.a.run.app",
      headers: {
        "Content-Type": "application/json",
      },
    });
    KyroApiFunctions.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
        }
        return Promise.reject(error);
      }
    );
  };

  public static post = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => {
    return KyroApiFunctions.axios.post<T>(url, data, config);
  };
  public static patch = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => KyroApiFunctions.axios.patch(url, data, config);
  public static get = <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => KyroApiFunctions.axios.get(url, config);
  public static put = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => KyroApiFunctions.axios.put<T>(url, data, config);
  public static delete = (
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise => KyroApiFunctions.axios.delete(url, config);
}
