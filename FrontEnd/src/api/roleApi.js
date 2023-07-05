import { message } from "antd";
import axiosClient from "./axiosClient";

class RoleApi {
    getAll = (params) => {
        const url = '/roles';
        return axiosClient.get(url, { params });
    };
    postrole = (params) => {
        const url = '/roles';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deleterole = (id) => {
        const url = `/roles/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editrole = (params) => {
        const url = `/roles/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const roleApi = new RoleApi();
export default roleApi;