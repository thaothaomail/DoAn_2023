import { message } from "antd";
import axiosClient from "./axiosClient";

class ThongbaoApi {
    getAll = (params) => {
        const url = '/thongbaos';
        return axiosClient.get(url, { params });
    };
    postthongbao = (params) => {
        const url = '/thongbaos';
        return axiosClient.post(url, params).then(data => {
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletethongbao = (id) => {
        const url = `/thongbaos/${id}`;
        return axiosClient.delete(url).then(data => {
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editthongbao = (params) => {
        const url = `/thongbaos/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const thongbaoApi = new ThongbaoApi();
export default thongbaoApi;