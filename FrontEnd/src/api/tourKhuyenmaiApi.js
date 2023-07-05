import { message } from "antd";
import axiosClient from "./axiosClient";

class TourkhuyenmaiApi {
    getAll = (params) => {
        const url = '/tourkhuyenmais';
        return axiosClient.get(url, { params });
    };
    posttourkhuyenmai = (params) => {
        const url = '/tourkhuyenmais';
        return axiosClient.post(url, params).then(ok => {
            message.success("Cập nhật thành công!");
        })
    };
    deletetourkhuyenmai = (id) => {
        const url = `/tourkhuyenmais/${id}`;
        return axiosClient.delete(url)
    };
    edittourkhuyenmai = (params) => {
        const url = `/tourkhuyenmais/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tourkhuyenmaiApi = new TourkhuyenmaiApi();
export default tourkhuyenmaiApi;