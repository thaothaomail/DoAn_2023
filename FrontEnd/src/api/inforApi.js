import axiosClient from "./axiosClient";

class InforApi {
    infor = () => {
        const url = '/checkuser';
        if (localStorage.getItem("token")) {
            return axiosClient.get(url);
        } else {
            return '';
        }
    };
    img = () => {
        const url = '/checkuser';
        if (localStorage.getItem("token")) {
            return axiosClient.get(url).then(data => {
                return data.data.avatar
            }).catch(err => {
                console.log(err.message);
            });
        } else {
            return '';
        }
    };

}
const inforApi = new InforApi();
export default inforApi;