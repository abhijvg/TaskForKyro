import KyroApiService from "../KyroApiService";
import {
  RegisterUserRequest,
  FetchUserResponse,
} from "../../models/KyroApiDataModels";

export default class UsersApi {
  public static registerUsers = async (registerParams: RegisterUserRequest) => {
    const data = await KyroApiService.post("/users", registerParams);
    return data;
  };

  public static fetchEmployeeFromId = async (id: string) => {
    const data = await KyroApiService.get<FetchUserResponse>(`/users/${id}`);
    console.log(data);
    return data;
  };
}
