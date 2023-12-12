import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import weatherServices from "../api/weather";

export const useWeatherStore = defineStore('weather', {
    state: ()=> ({
        weather: useStorage('weather', {})
    }),
    actions: {
        async getWeather(city) {
            const data = await weatherServices.getWeather(city)
            data.forecast.forecastday.shift()
            const weather = {
                temp: data.current.temp_c,
                icon: 'https:' + data.current.condition.icon,
                days: data.forecast.forecastday,
                location: {
                    city: data.location.name,
                    country: data.location.country
                }
            }
            this.weather = weather
            return weather;
        }
    }
})