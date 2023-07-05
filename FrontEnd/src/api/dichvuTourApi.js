import { message } from "antd";
import axiosClient from "./axiosClient";

class DichvutourApi {
    getAll = (params) => {
        const url = '/dichvutours';
        return axiosClient.get(url, { params });
    };
    postdichvutour = (params) => {
        const url = '/dichvutours';
        return axiosClient.post(url, params)
    };
    deletedichvutour = (id) => {
        const url = `/dichvutours/${id}`;
        return axiosClient.delete(url)
    };
    editdichvutour = (params) => {
        const url = `/dichvutours/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const dichvutourApi = new DichvutourApi();
export default dichvutourApi;