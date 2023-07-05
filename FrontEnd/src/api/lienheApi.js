import { message } from "antd";
import axiosClient from "./axiosClient";

class LienheApi {
    getAll = (params) => {
        const url = '/lienhes';
        return axiosClient.get(url, { params });
    };
    postlienhe = (params) => {
        const url = '/lienhes';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletelienhe = (id) => {
        const url = `/lienhes/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editlienhe = (params) => {
        const url = `/lienhes/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const lienheApi = new LienheApi();
export default lienheApi;