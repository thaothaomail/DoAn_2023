import { message } from "antd";
import axiosClient from "./axiosClient";

class TourApi {
    getAll = (params) => {
        const url = '/tours';
        return axiosClient.get(url, { params });
    };
    getOne = (id) => {
        const url = `/tours/${id}`;
        return axiosClient.get(url);
    };
    posttour = (params) => {
        const url = '/tours';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            console.log(err, err.message);
            message.error("Có lỗi xảy ra!");
        });
    };
    deletetour = (id) => {
        const url = `/tours/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edittour = (params) => {
        const url = `/tours/${params.idsua}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tourApi = new TourApi();
export default tourApi;