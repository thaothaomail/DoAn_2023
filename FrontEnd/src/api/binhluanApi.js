import { message } from "antd";
import axiosClient from "./axiosClient";

class BinhluanApi {
    getAll = (params) => {
        const url = '/binhluans';
        return axiosClient.get(url, { params });
    };
    postbinhluan = (params) => {
        const url = '/binhluans';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletebinhluan = (id) => {
        const url = `/binhluans/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editbinhluan = (params) => {
        const url = `/binhluans/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const binhluanApi = new BinhluanApi();
export default binhluanApi;