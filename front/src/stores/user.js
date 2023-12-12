import { defineStore } from "pinia";
import userServices from "@/api/user";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";
import { useWeatherStore } from "./weather";

export const useUserStore = defineStore("user", {
  state: () => ({
    loggedIn: useStorage("loggedIn", false),
    user: useStorage("user", {}),
    favoritesWeather: [],
    favorites: [],
    router: useRouter(),
    weatherStore: useWeatherStore(),
  }),
  actions: {
    async login(user) {
      try {
        const data = await userServices.login(user);
        this.loggedIn = true;
        console.log(data)
        this.user = data;
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async register(user) {
      try {
        const data = await userServices.register(user);
        this.login(user)
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
      this.router.push("/login");
    },
    async getFavorites() {
      try {
        this.favorites = [];
        this.favoritesWeather = [];
        const data = await userServices.getFavorites(this.user.id);
        for (let favorite of data) {
          if (favorite.user == this.user.id) {
            this.favorites.push(favorite);
            const weather = await this.weatherStore.getWeather(favorite.name);
            this.favoritesWeather.push(weather);
          }
        }
        console.log(this.favorites);
        console.log(this.favoritesWeather);
      } catch (err) {
        console.log(err);
      }
    },
    async addFavorite(city) {
      try {
        const data = await userServices.addFavorite(this.user.id, city);
        await this.getFavorites();
      } catch (err) {
        console.log(err);
      }
    },
    async removeFavorite(city) {
      try {
        const cityId = this.favorites.find(
          (favorite) => favorite.name == city
        ).id;
        const data = await userServices.removeFavorite(cityId);
        await this.getFavorites();
      } catch (err) {
        console.log(err);
      }
    },
  },
});
