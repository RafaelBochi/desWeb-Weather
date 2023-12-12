<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserStore()

const loggedIn = computed(() => userStore.loggedIn)

onMounted(async()=> {
  if(loggedIn.value){
    await userStore.getFavorites()
    router.push('/')
  }
  else {
    router.push('/login')
  }


})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
