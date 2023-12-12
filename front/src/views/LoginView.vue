<script setup>
import LoginForm from '../components/Login/LoginForm.vue';
import RegisterForm from '../components/Login/RegisterForm.vue';
import { ref } from 'vue';

const activeForm = ref('login')

function changeForm(form) {
    if (form == "login") {
        activeForm.value = form
    }
    else if (form == 'register') {
        activeForm.value = form
    }
}
</script>

<template>
    <main>
        <section class="changeForm">
            <button @click="changeForm('login')" :class="activeForm == 'login' ? 'formActive' : ''">
                Entrar
            </button>
            <button @click="changeForm('register')" :class="activeForm == 'register' ? 'formActive' : ''">
                Registrar-se
            </button>
        </section>
        <LoginForm v-if="activeForm == 'login'"/>
        <RegisterForm v-if="activeForm == 'register'"/>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    .changeForm {
        display: flex;
    }

    .changeForm button {
        background-color: var(--background);
        border: none;
        color: var(--text-light);
        padding: 10px 20px;
        font-weight: bolder;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        cursor: pointer;    
    }

    .formActive {
        color: var(--primary) !important;
        background-color: #ffffff !important;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        z-index: 9;
    }
</style>