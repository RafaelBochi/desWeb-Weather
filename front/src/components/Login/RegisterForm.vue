<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

const showPassword = ref(false)

const username = ref(null)
const email = ref(null)
const password = ref(null)

async function register() {
    const user = {
        username: username.value,
        email: email.value,
        password: password.value
    };
    await userStore.register(user);
    console.log('register')
}
</script>

<template>
    <section class="form">
        <div class="input">
            <input type="text" required v-model="username">
            <label>Username</label>
            <i>
                <font-awesome-icon :icon="['fas', 'user']" />
            </i>
        </div>
        <div class="input">
            <input type="text" required v-model="email">
            <label>Email</label>
            <i>
                <font-awesome-icon :icon="['fas', 'envelope']" />
            </i>
        </div>
        <div class="input">
            <input :type="showPassword ? 'text' : 'password'" required v-model="password">
            <label>Password</label>
            <i v-if="showPassword" @click="showPassword = !showPassword">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </i>
            <i v-else @click="showPassword = !showPassword">
                <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </i>
        </div>

        <button @click="register" @keydown.enter="register">
            Registrar-se
        </button>
    </section>
</template>

<style scoped>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5%;
        width: 25%;
        gap: 30px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        min-width: 300px;
        min-height: 300px;
    }

    .input {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        
    }

    .input input {
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--text-light);
        outline: none;
        font-size: 1.2rem;
        height: 30px;
        padding: 0 10px;
        background-color: transparent;
        z-index: 2;
    }

    .input label {
        position: absolute;
        top: 8px;
        left: 10px;
        font-size: 1.2rem;
        color: var(--text-light);
        text-transform: uppercase;
        font-weight: bolder;
        transition: all 0.3s ease-in-out;
        letter-spacing: 0.1rem;
        z-index: 1;
    }   

    .input i {
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 3;
        cursor: pointer;
    }

    .input input:focus ~ label, .input input:valid ~ label {
        top: -10px;
        font-size: 1rem;
        color: var(--primary);
    }

    .input input:focus, .input input:valid {
        border-bottom: 1px solid var(--primary);
    }

    button {
        padding: 10px 40px;
        border: none;
        cursor: pointer;
        background-color: var(--primary);
        color: var(--background);
        font-weight: bolder;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
    }
</style>
