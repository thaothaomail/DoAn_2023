import { message } from "antd";
import axiosClient from "./axiosClient";

class KhuyenmaiApi {
    getAll = (params) => {
        const url = '/khuyenmais';
        return axiosClient.get(url, { params });
    };
    postkhuyenmai = (params) => {
        const url = '/khuyenmais';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletekhuyenmai = (id) => {
        const url = `/khuyenmais/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editkhuyenmai = (params) => {
        const url = `/khuyenmais/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const khuyenmaiApi = new KhuyenmaiApi();
export default khuyenmaiApi;