import { message } from "antd";
import axiosClient from "./axiosClient";

class HoadonApi {
    getAll = (params) => {
        const url = '/hoadons';
        return axiosClient.get(url, { params });
    };
    posthoadon = (params) => {
        const url = '/hoadons';
        return axiosClient.post(url, params).then(data => {
            message.success("Đặt vé thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletehoadon = (id) => {
        const url = `/hoadons/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edithoadon = (params) => {
        const url = `/hoadons/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const hoadonApi = new HoadonApi();
export default hoadonApi;