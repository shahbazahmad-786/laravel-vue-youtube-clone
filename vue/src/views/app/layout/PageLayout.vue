<template>
    <div class="relative">
        <div id="TopNav" class="w-[100%] h-[60px] fixed bg-black z-20 flex items-center justify-between">
            <div class="flex items-center">
                <button @click="isNavOverlay()" class="p-2 ml-3 rounded-full hover:bg-gray-800 inline-block cursor-pointer">
                    <MenuIcon fillColor="#FFFFFF" :size="26" />
                </button>
                <div class="mx-2"></div>
                <router-link to="/" class="flex items-center justify-center mr-10 cursor-pointer">
                    <img class="" width="32" :src="appLogo" alt="">
                    <img width="62" :src="appTextLogo" alt="">
                </router-link>
            </div>

            <div class="w-[600px] md:block hidden">
                <div class="rounded-full flex items-center bg-[#222222] ">
                    <input type="text"
                        class="form-control block w-full px-5 py-1.5 text-base font-normal text-gray-200 bg-black placeholder-gray-400  bg-clip-padding border  border-solid  border-l-gray-700  border-y-gray-700 rounded-l-full  transition  ease-in-out m-0 border-transparent focus:ring-0"
                        placeholder="Search" />
                    <MagnifyIcon class="mx-6" fillColor="#FFFFFF" :size="23" />
                </div>
            </div>
            <div>
                <img class="rounded-full mx-8" width="35" :src="randImg">
            </div>
        </div>




        <div v-if="width > 639">
            <div v-if="route.fullPath === '/'" id="SideNav" :class="[
                !openSideNav ? 'w-[70px]' : 'w-[240px]',
            ]" class="h-[100%] fixed z-0 bg-black">

                <ul :class="[!openSideNav ? 'p-2' : 'px-5 pb-2 pt-[7px]']" class="mt-[60px] w-full">
                    <router-link :to="{ name: 'Home' }">
                        <SideNavItem :openSideNav="openSideNav" iconString="Home" />
                    </router-link>
                    <router-link :to="{ name: 'AddVideo' }">
                        <SideNavItem :openSideNav="openSideNav" iconString="Add Video" />
                    </router-link>
                    <SideNavItem :openSideNav="openSideNav" iconString="Delete Video" />
                    <div class="border-b border-b-gray-700 my-2.5"></div>
                    <SideNavItem :openSideNav="openSideNav" iconString="Subscriptions" />
                    <SideNavItem :openSideNav="openSideNav" iconString="Library" />
                    <SideNavItem :openSideNav="openSideNav" iconString="Liked" />
                    <SideNavItem :openSideNav="openSideNav" iconString="History" />
                    <SideNavItem :openSideNav="openSideNav" iconString="Watch Later" />
                    <div @click="logout">
                        <SideNavItem :openSideNav="openSideNav" iconString="Logout" />
                    </div>
                    <div v-if="openSideNav">
                        <div class="border-b border-b-gray-700 my-2.5">
                        </div>
                        <div class="text-gray-400 text-[14px] text-extrabold">
                            About Press Copyright
                            <div>Contact us</div>
                            Creator Advertise Developers
                        </div>
                        <div class="border-b border-b-gray-700 my-2.5"></div>
                        <div class="text-gray-400 text-[14px] text-extrabold">
                            Terms Privacy Policy & Safety
                            <div>How YouTube works</div>
                            <span>Test new features</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>


        <!-- OVERLAY NAV SECTION -->
        <div @click="openSideNavOverlay = false" class="bg-black bg-opacity-70 fixed z-50 w-full h-screen" :class="openSideNavOverlay
            ? 'animate__animated animate__fadeIn animate__faster'
            : 'hidden z-[-1]'
            " />
        <div id="SideNavOverlay" ref="sideNavOverlay" class="h-[100%] fixed z-50 bg-black mt-[9px] w-[240px]" :class="openSideNavOverlay
            ? 'animate__animated animate__slideInLeft animate__faster'
            : 'animate__animated animate__slideOutLeft animate__faster'
            ">
            <div class="flex items-center">
                <button @click="isNavOverlay()" class="p-2 ml-3 rounded-full hover:bg-gray-800 cursor-pointer">
                    <MenuIcon fillColor="#FFFFFF" :size="26" />
                </button>
                <div class="mx-2"></div>
                <router-link to="/" class="flex items-center justify-center cursor-pointer">
                    <img class="" width="32" :src="appLogo" alt="">
                    <img width="62" :src="appTextLogo" alt="">
                </router-link>
            </div>
            <ul class=" w-full px-5 py-2 p-2 mt-2">
                <router-link :to="{ name: 'Home' }">
                    <SideNavItem :openSideNav="true" iconString="Home" />
                </router-link>
                <router-link :to="{ name: 'AddVideo' }">
                    <SideNavItem :openSideNav="true" iconString="Add Video" />
                </router-link>
                <SideNavItem :openSideNav="true" iconString="Delete Video" />
                <div class="border-b border-b-gray-700 my-2.5"></div>
                <SideNavItem :openSideNav="true" iconString="Subscriptions" />
                <SideNavItem :openSideNav="true" iconString="Library" />
                <SideNavItem :openSideNav="true" iconString="Liked" />
                <SideNavItem :openSideNav="true" iconString="History" />
                <SideNavItem :openSideNav="true" iconString="Watch Later" />
                <div v-if="true">
                    <div class="border-b border-b-gray-700 my-2.5"></div>
                    <div class="text-gray-400 text-[14px] text-extrabold">
                        About Press Copyright
                        <div>Contact us</div>
                        Creator Advertise Developers
                    </div>
                    <div class="border-b border-b-gray-700 my-2.5"></div>
                    <div class="text-gray-400 text-[14px] text-extrabold">
                        Terms Privacy Policy & Safety
                        <div>How YouTube works</div>
                        <span>Test new features</span>
                    </div>
                </div>
            </ul>
        </div>
        <!-- OVERLAY NAV SECTION END -->

        <div class="w-[100%] h-[calc(100vh-60px)] absolute right-0 top-[60px]" :class="{
            'w-[calc(100%-70px)]': !openSideNav,
            'w-[calc(100%-240px)]': openSideNav,
            'w-[100vw] xl:w-[calc(100%-80px)]': route.fullPath !== '/',
            'w-[100vw]': width < 639
        }
            ">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SideNavItem from '@/views/app/layout/SideNavItem.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

const route = useRoute();
const { push } = useRouter();
const { state, dispatch } = useStore();
const appTextLogo = computed(() => state.app.textLogo);
const appLogo = computed(() => state.app.logo);
let openSideNav = ref(true);
let openSideNavOverlay = ref(false);
let sideNavOverlay = ref(null);
let width = ref(document.documentElement.clientWidth);
let randImg = ref(`https://picsum.photos/id/${(Math.random() * 200).toFixed(0)}/100`)

onMounted(() => {
    resize();
    sideNavOverlay.value.classList.value = sideNavOverlay.value.classList.value += ' hidden'
    window.addEventListener('resize', () => {
        width.value = document.documentElement.clientWidth;
        resize();
    });
});

const resize = () => {
    if (width.value < 1280 && openSideNav.value) {
        openSideNav.value = false;
    }
    if (width.value > 1279 && !openSideNav.value) {
        openSideNav.value = true;
    }
}

const isNavOverlay = () => {
    if (route.fullPath === '/') openSideNav.value = !openSideNav.value
    if (route.fullPath === '/add-video') openSideNavOverlay.value = !openSideNavOverlay.value
    // if (usePage().url === '/delete-video') openSideNavOverlay.value = !openSideNavOverlay.value
    if (width.value < 640) openSideNavOverlay.value = !openSideNavOverlay.value
    if (route.fullPath !== '/' && width.value < 640) openSideNavOverlay.value = !openSideNavOverlay.value
    if (route.params.id) openSideNavOverlay.value = !openSideNavOverlay.value
}

const logout = () => {
    if (!confirm(`Are you sure you want to "Logout" this site?`)) {
        return;
    }
    dispatch("logout").then(() => push({ name: 'Login' }));
}
</script>

