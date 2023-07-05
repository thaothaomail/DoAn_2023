import { message } from "antd";
import axiosClient from "./axiosClient";

class MangxahoiApi {
    getAll = (params) => {
        const url = '/mangxahois';
        return axiosClient.get(url, { params });
    };
    postmangxahoi = (params) => {
        const url = '/mangxahois';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletemangxahoi = (id) => {
        const url = `/mangxahois/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editmangxahoi = (params) => {
        const url = `/mangxahois/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const mangxahoiApi = new MangxahoiApi();
export default mangxahoiApi;