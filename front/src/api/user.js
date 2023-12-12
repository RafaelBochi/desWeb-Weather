import axios from 'axios';

class UserServices {
    async login(user) {
        const { data } = await axios.post('/api/login/', user);
        return data;
    }
    async register(user) {
        const { data } = await axios.post('/api/register/', user);
        return data;
    }
    async getFavorites(id) {
        const { data } = await axios.get(`/favoriteCities/?user=${id}/`);
        return data;
    }
    async addFavorite(id, city) {
        const { data } = await axios.post(`/favoriteCities/`, {
            user: id,
            name: city
        });
        return data;
    }
    async removeFavorite(id) {
        const { data } = await axios.delete(`/favoriteCities/${id}/`);
        return data;
    }
}

export default new UserServices();