<template>
    <AuthPageLayout heading="Login Form">
        <form @submit.prevent="login">
            <div class="my-5">
                <div class="text-gray-200">Email</div>
                <input v-model="user.email" type="text"
                    class="form-control block w-full px-5 py-1.5 text-xl font-normal text-gray-200 bg-black placeholder-gray-400 bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 border-transparent focus:ring-0"
                    placeholder="Enter email" />
            </div>
            <div class="my-5">
                <div class="text-gray-200">Password</div>
                <input v-model="user.password" type="password"
                    class="form-control block w-full px-5 py-1.5 text-xl font-normal text-gray-200 bg-black placeholder-gray-400 bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 border-transparent focus:ring-0"
                    placeholder="Enter Password" />
            </div>

            <div class="flex justify-between items-center">
                <router-link :to="{ name: 'Register' }" class="text-blue-700">
                    Not have an account?
                </router-link>
                <button type="submit"
                    class="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded cursor-pointer">
                    Login
                </button>
            </div>
        </form>
    </AuthPageLayout>
</template>

<script setup>
import AuthPageLayout from '../layout/AuthPageLayout.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const { dispatch } = useStore();
const { push } = useRouter();
let user = {
    email: '',
    password: null
}

const login = () => {
    dispatch("login", user).then(() => push({ name: 'Home' }));
}
</script>