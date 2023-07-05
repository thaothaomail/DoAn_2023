import { message } from "antd";
import axiosClient from "./axiosClient";

class AnhApi {
    getAll = (params) => {
        const url = '/anhs';
        return axiosClient.get(url, { params });
    };
    postanh = (params) => {
        const url = '/anhs';
        return axiosClient.post(url, params)
    };
    deleteanh = (id) => {
        const url = `/anhs/${id}`;
        return axiosClient.delete(url)
    };
    editanh = (params) => {
        const url = `/anhs/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const anhApi = new AnhApi();
export default anhApi;