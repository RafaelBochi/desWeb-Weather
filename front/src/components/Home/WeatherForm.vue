<script setup>
import { useWeatherStore } from '../../stores/weather';
import { useUserStore } from '../../stores/user';
import { ref, onMounted, computed } from 'vue';

const weatherStore = useWeatherStore()
const userStore = useUserStore()
const weather = computed(() => {
    return weatherStore.weather;
})

const city = ref(null)

async function getWeather() {
    const data = await weatherStore.getWeather(city.value)
    city.value = null;
}

const favorites = computed(() => userStore.favorites)

const favorite = computed(() => {
    console.log(favorites.value.includes(weather.value.location.city))
    if (favorites.value.find(city => city.name == weather.value.location.city )) return true;
    else return false;
})


const daysWeek = ref([])

function addFavorite(){
    if (favorite.value) {
        userStore.removeFavorite(weather.value.location.city);
        return;
    }
    userStore.addFavorite(weather.value.location.city)
}

onMounted(async ()=> {
    await getWeather();

    for(let day of weather.value.days){
        console.log(day.date)
        const date = new Date(day.date)
        let dayWeek = date.getDay()
        if(dayWeek == 0) dayWeek = 'Seg';
        if(dayWeek == 1) dayWeek = 'Ter';
        if(dayWeek == 2) dayWeek = 'Qua';
        if(dayWeek == 3) dayWeek = 'Qui';
        if(dayWeek == 4) dayWeek = 'Sex';
        if(dayWeek == 5) dayWeek = 'Sab';
        if(dayWeek == 6) dayWeek = 'Dom';
        daysWeek.value.push(dayWeek)
    }

    console.log(daysWeek.value)
})
</script>

<template>
    <section class="form">

        <div class="input">
            <input type="text" placeholder="Busque por uma cidade..." v-model="city">
            <button @click="getWeather">Buscar</button>
        </div>

        <div class="info">

            <span class="favorite" @click="addFavorite">
                <font-awesome-icon :icon="['fas', 'heart']" size="2xl" style="color: var(--background);" v-if="favorite"/>
                <font-awesome-icon :icon="['far', 'heart']" size="2xl" style="color: var(--background);" v-else/>
            </span>

            <div class="location">
                <p class="city">
                    {{ weather.location.city }}
                </p>

                <p class="country">
                    {{ weather.location.country }}
                </p>
            </div>

            <div class="weather">
                <span class="icon">
                    <img :src="weather.icon" alt="">
                </span>

                <p class="temp">
                    {{ weather.temp }}°C
                </p>
            </div>

            <div class="week">
                <div v-for="day, index in weather.days" :key="day" class="day">

                    <p>
                        {{ daysWeek[index] }}
                    </p>

                    <img :src="'https:' + day.day.condition.icon" alt="" class="icon">

                    <p>
                        {{ day.day.mintemp_c }} - {{ day.day.maxtemp_c }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80%;
        margin: auto;
        padding: 50px 100px;
        background-color: var(--primary-light);
        border-radius: 10px;
        gap: 80px;
    }

    .input {
        display: flex;
        align-items: center;
        gap: 2px;
    }

    .input input {
        background-color: var(--background);
        border: none;
        outline: 0;
        padding: 5px 10px;
        height: 30px;
        border-radius: 10px 0px 0px 10px;
    }

    .input button {
        background-color: var(--background);
        border: none;
        outline: 0;
        padding: 2px 5px;
        cursor: pointer;
        height: 30px;
        font-weight: bolder;
        letter-spacing: 0.1rem;
        border-radius: 0px 10px 10px 0px;
        text-transform: uppercase;
    }

    .info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-radius: 10px;
        height: 60%;
    }

    .info .favorite {
        position: absolute;
        top: 8px;
        right: 0px;
        cursor: pointer;
    }

    .info .location {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
    }

    .info .location .city {
        font-size: 3rem;
        font-weight: bolder;
        color: var(--background);
        text-transform: uppercase;
    }

    .info .location .country {
        font-size: 1.4rem;
        color: var(--background);
    }

    .info .weather {
        display: flex;
        align-items: center;
        gap: 40px;
        width: 100%;
    }

    .info .weather .icon img{
        width: 100px;
        height: 100px;
    }

    .info .weather .temp {
        font-size: 6rem;
        font-weight: bolder;
        color: var(--background);
    }

    .info .week {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .info .week .day {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        width: 100%;
        color: var(--background);
        font-size: 1.6rem;
    }

    .info .week .day .icon img {
        width: 30px;
        height: 30px;
    }
</style>