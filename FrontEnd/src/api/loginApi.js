import { message } from "antd";
import axiosClient from "./axiosClient";

class LoginApi {
    login = (params) => {
        const url = '/login';
        return axiosClient.post(url, params).then(data => {
            return data
        }).catch(err => {
            console.log(err.message);
        });
    };
}
const loginApi = new LoginApi();
export default loginApi;