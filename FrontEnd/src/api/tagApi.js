import { message } from "antd";
import axiosClient from "./axiosClient";

class TagApi {
    getAll = (params) => {
        const url = '/tags';
        return axiosClient.get(url, { params });
    };
    posttag = (params) => {
        const url = '/tags';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletetag = (id) => {
        const url = `/tags/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edittag = (params) => {
        const url = `/tags/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tagApi = new TagApi();
export default tagApi;