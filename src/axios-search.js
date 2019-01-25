import axios from 'axios';

const url = window.location.href.match(/^http:\/\/(.*):/g); // http://{{ some ip address/ dns name / localhost }}:
const port = 8000;

const instance = axios.create({
    baseURL: url + port + '/api'
});

export default instance;