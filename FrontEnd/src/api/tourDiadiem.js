import { message } from "antd";
import axiosClient from "./axiosClient";

class TourdiadiemApi {
    getAll = (params) => {
        const url = '/tourdiadiems';
        return axiosClient.get(url, { params });
    };
    posttourdiadiem = (params) => {
        const url = '/tourdiadiems';
        return axiosClient.post(url, params)
    };
    deletetourdiadiem = (id) => {
        const url = `/tourdiadiems/${id}`;
        return axiosClient.delete(url)
    };
    edittourdiadiem = (params) => {
        const url = `/tourdiadiems/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tourdiadiemApi = new TourdiadiemApi();
export default tourdiadiemApi;