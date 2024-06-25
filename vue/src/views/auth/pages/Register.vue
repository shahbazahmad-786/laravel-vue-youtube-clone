<template>
    <AuthPageLayout heading="Register Form">
        <form @submit.prevent="register">
            <div class="my-5">
                <div class="text-gray-200">Name</div>
                <input v-model="user.name" type="text"
                    class="form-control block w-full px-5 py-1.5 text-xl font-normal text-gray-200 bg-black placeholder-gray-400 bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 border-transparent focus:ring-0"
                    placeholder="Enter name" />
            </div>
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
            <div class="my-5">
                <div class="text-gray-200">Password Confirmation</div>
                <input v-model="user.password_confirmation" type="password"
                    class="form-control block w-full px-5 py-1.5 text-xl font-normal text-gray-200 bg-black placeholder-gray-400 bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 border-transparent focus:ring-0"
                    placeholder="Enter Password again" />
            </div>

            <div class="flex justify-between items-center">
                <router-link :to="{ name: 'Login' }" class="text-blue-700">
                    Already have an account?
                </router-link>
                <button type="submit"
                    class="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded cursor-pointer">
                    Register
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
    name: '',
    email: '',
    password: null
}

const register = () => {
    dispatch("register", user).then(() => push({ name: 'Home' }));
}
</script>