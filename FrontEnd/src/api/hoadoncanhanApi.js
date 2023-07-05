import { message } from "antd";
import axiosClient from "./axiosClient";

class HoadoncanhanApi {
    getAll = (params) => {
        const url = '/hoadoncanhans';
        return axiosClient.get(url, { params });
    };
    posthoadoncanhan = (params) => {
        const url = '/hoadoncanhans';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletehoadoncanhan = (id) => {
        const url = `/hoadoncanhans/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edithoadoncanhan = (params) => {
        const url = `/hoadoncanhans/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const hoadoncanhanApi = new HoadoncanhanApi();
export default hoadoncanhanApi;