import axios from 'axios';

function parseBody(response) {
    return response
}


function parseError(error) {
    if (error) {
        if (error.response === undefined) {
            return Promise.reject(error)
        } else {
            return Promise.reject(error.response)
        }
    }
}


let instance = axios.create();


instance.interceptors.request
    .use((config) => {
        const authentication = "dfdc44321f70cba56e07051e82b6ce709739c060";
            config.headers = {
                'Authorization': `Bearer ${authentication}`,
            }
            return config;
    }, error => {
        return Promise.reject(error)
    });



    instance
    .interceptors
    .response
    .use((response) => {
        return parseBody(response);
    }, error => {
        return parseError(error);
    });

    export const http = instance;