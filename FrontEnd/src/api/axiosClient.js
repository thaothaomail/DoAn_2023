import axios from 'axios';
import queryString from 'query-string';
import firebase from "firebase"

const getFirebasetoken = async () => {
    const currenUser = firebase.auth().currentUser;
    if (currenUser) {
        return currenUser.getIdToken();
    }
    const hasRememberAccount = localStorage.getItem("token");
    if (!hasRememberAccount) return null;

    return new Promise((resolve, reject) => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null)
            }
            const token = await user.getIdToken();
            console.log("axios token" + token);
            resolve(token);
            unregisterAuthObserver();
        }
        )
    })
}
const axiosClient = axios.create({
    baseURL: `http://localhost:666`,
    headers: {
        'content-type': "application/json",
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // const token = await getFirebasetoken();
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.authorization = `Bearer ${token}`
        //console.log(token);
    }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;