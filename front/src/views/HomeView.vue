<script setup>
import Header from '../components/Header.vue';
import WeatherForm from '../components/Home/WeatherForm.vue';
import FavoritesCities from '../components/Home/FavoritesCities.vue';
</script>

<template>
  <main>
    <Header />
    <FavoritesCities />
    <WeatherForm/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>
