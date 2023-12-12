<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const router = useRouter()
const loggedIn = computed(() => userStore.loggedIn)
const user = computed(() => userStore.user)

function login() {
    router.push('/login')
}

function logout(){
    userStore.logout()
}

onMounted(()=> {
    console.log(user.value)
})
</script>

<template>
    <header>
        <div class="logo">
            <img src="/logo.png" alt="" class="logo">
            <p>
                Weather
            </p>
        </div>

        <div class="user" v-if="loggedIn">
            <div class="info">
                <p class="username">
                    {{ user.username }}
                </p>

                <p class="email">
                    {{ user.email }}
                </p>
            </div>
            <button @click="logout">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" size="xl"/>
            </button>
        </div>

        <button class="login" @click="login" v-else>
            <p>
                Entrar
            </p>

            <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </button>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 8%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.logo {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
}

.logo img {
    width: 100%;
    height: 100%;
}

.logo p {
    margin-left: 10px;
    font-weight: bolder;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: var(--primary-dark);
    letter-spacing: 0.1rem;
}

.login {
    display: flex;
    gap: 10px;
    padding: 5px 20px;
    border: none;
    background-color: var(--primary);
    color: #ffffff;
    font-weight: bolder;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 5px;
}

.user {
    display: flex;
    gap: 10px
}

.user .info {
    display: flex;
    flex-direction: column;
}

.user .info .username {
    font-size: 1.4rem;
    color: var(--primary-dark);
    font-weight: bolder;
}

.user .info .email {
    color: var(--text-light);
}

.user button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

</style>