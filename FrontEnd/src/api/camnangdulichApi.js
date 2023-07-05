import { message } from "antd";
import axiosClient from "./axiosClient";

class CamnangdulichApi {
    getAll = (params) => {
        const url = '/camnangdulichs';
        return axiosClient.get(url, { params });
    };
    postcamnangdulich = (params) => {
        const url = '/camnangdulichs';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletecamnangdulich = (id) => {
        const url = `/camnangdulichs/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editcamnangdulich = (params) => {
        const url = `/camnangdulichs/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const camnangdulichApi = new CamnangdulichApi();
export default camnangdulichApi;