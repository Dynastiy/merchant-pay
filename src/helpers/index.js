import axios from 'axios';

const url = 'https://api.verify.szcmerchant.com/api/';

export default {
    async login(credentials) {
        const response = await axios
            .post(url + 'admin/login/', credentials);
        return response.data;
    },
    
    async getKyc(page) {
        const response = await axios
            .get(`${url}kyc/details?page=${page}`);
        return response.data;
    },
    async getKycByRef(id) {
        const response = await axios
            .get(`${url}kyc/${id}/view`);
        return response.data;
    },
    async getStaffs() {
        const response = await axios
            .get(url + 'admin/users/list');
        return response.data.data;
    },
};