import axios from 'axios'

export const cancelToken = axios.CancelToken;
export const source = cancelToken.source();

export var get = function (url) {
    return axios.create().get(url, {cancelToken: source.token})
}

export var post_json = function (url) {
    return axios.create({headers: {"Content-Type": "application/json"}}).post(url, {cancelToken: source.token})
}

export var download = function (url) {
    return axios.create({method: 'GET', responseType: 'blob'}).get(url, {cancelToken: source.token})
}

export var cancel = function () {
    source.cancel('Operation canceled by the user.');
}
