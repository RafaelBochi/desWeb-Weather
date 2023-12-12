<script setup>
import { useUserStore } from '../../stores/user';
import { computed, ref } from 'vue';
import { useWeatherStore } from '../../stores/weather';

const weatherStore = useWeatherStore()
const userStore = useUserStore()

const favoritesWeather = computed(() => userStore.favoritesWeather)

function getWeather(city) {
    weatherStore.getWeather(city)
}
</script>

<template>
    <section>
        <div class="favorites">
            <div class="favorite" v-for="favorite in favoritesWeather" :key="favorite?.location?.city" @click="getWeather(favorite?.location?.city)">
                <div class="location">
                    <p class="city">
                        {{ favorite?.location?.city }}
                    </p>

                    <p class="country">
                        {{ favorite?.location?.country }}
                    </p>
                </div>

                <div class="weather">
                    <p class="temp">
                        {{ favorite?.temp }}°C
                    </p> 
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.favorites {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: auto;
    overflow: auto;
    gap: 20px;
}

.favorite {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 200px;
    margin: 0 20px;
    padding: 20px;
    background-color: var(--primary-light);
    border-radius: 10px;
    gap: 20px;
    cursor: pointer;
}

.favorite .removeFavorite {
    position: absolute;
    top: 10px;
    right: 10px;
}

.favorite .location {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.favorite .location .city {
    font-size: 1.5rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: var(--background);
    width: 100px;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}

.favorite .location .country {
    font-size: 1rem;
    color: var(--background);
}

.favorite .weather {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.favorite .weather .temp {
    font-size: 2rem;
    font-weight: bolder;
    color: var(--background);
}

</style>