import { message } from "antd";
import axiosClient from "./axiosClient";

class TourngaydiApi {
    getAll = (params) => {
        const url = '/tourngaydis';
        return axiosClient.get(url, { params });
    };
    posttourngaydi = (params) => {
        const url = '/tourngaydis';
        return axiosClient.post(url, params)
    };
    deletetourngaydi = (id) => {
        const url = `/tourngaydis/${id}`;
        return axiosClient.delete(url)
    };
    edittourngaydi = (params) => {
        const url = `/tourngaydis/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tourngaydiApi = new TourngaydiApi();
export default tourngaydiApi;