import axios from "axios";

class WeatherServices {
    async getWeather(city) {
        const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=a6d4c1ff07cf4f81a69123758230412&lang=pt&q=${city}&days=6&aqi=no&alerts=no`)
        return data;
    }
}

export default new WeatherServices();