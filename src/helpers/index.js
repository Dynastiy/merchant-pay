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
            .get(url + 'users');
        return response.data;
    },
    async addStaff(payload) {
        const response = await axios
            .post(url + 'user/create', payload);
        return response.data;
    },
    async updatePassword(payload) {
        const response = await axios
            .post(url + 'user/change-password', payload);
        return response.data;
    },
    async activate(payload) {
        const response = await axios
            .post(url + 'admin/activate-user', payload);
        return response.data;
    },
    async deActivate(payload) {
        const response = await axios
            .post(url + 'admin/deactivate-user', payload);
        return response.data;
    },
    async send_feedback() {
        const response = await axios.post(url + 'kyc/send-mail')
        return response.data
    }
};