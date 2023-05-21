import axios from "axios";

export const apiCall = async (url, body, method) => {
    return axios({ method, url, body }).then((response) => {
        if (response.status == 200) {
            return new Promise((resolve) => {
                resolve({ status: true, result: response.data });
            })
        } else {
            resolve({ status: false, result: {} });
        }
    }).catch((error) => console.log('api call error', error))
}