import { KyroApiFunctions } from "./KyroApiFunctions";

export default class KyroApiService {
  public static post = async <T = any>(
    url: string,
    data?: any
  ): Promise<any> => {
    KyroApiFunctions.init();
    const response = await KyroApiFunctions.post(url, data);
    if (response.status === 401) {
    } else {
      return response;
    }
  };

  public static get = async <T = any>(url: string): Promise<any> => {
    KyroApiFunctions.init();
    const response = await KyroApiFunctions.get(url);
    if (response.status === 401) {
    } else {
      return response;
    }
  };

  public static patch = async <T = any>(
    url: string,
    data?: any
  ): Promise<any> => {
    KyroApiFunctions.init();
    const response = await KyroApiFunctions.patch(url, data);
    if (response.status === 401) {
    } else {
      return response;
    }
  };

  public static delete = async <T = any>(url: string): Promise<any> => {
    KyroApiFunctions.init();
    const response = await KyroApiFunctions.delete(url);
    if (response.status === 401) {
    } else {
      return response;
    }
  };
}
