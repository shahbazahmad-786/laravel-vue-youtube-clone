<template>
    <div>
        <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
            <div v-for="video in videos.videos" :key="video">
                <router-link :to="{ name: 'Video', params: { id: video.id } }">
                    <div class="relative">
                        <div class="rounded-lg bg-black m-2" :class="[
                            show && width > 639
                                ? 'absolute z-30 transition ease-in-out delay-150 hover:translate-y-8 hover:scale-125 hover:bg-[#202020] duration-300'
                                : ''
                        ]">
                            <div>
                                <img class="aspect-video cursor-pointer" :src="video.thumbnail || ''" />
                            </div>
                            <div>
                                <div class="flex mt-1.5">
                                    <div>
                                        <img class="rounded-full m-1.5 mt-2 flex items-baseline w-8 h-8"
                                            :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''">
                                    </div>
                                    <div class="px-1.5 text-white mt-1">
                                        <div class="text-[17px] font-extrabold w-full cursor-pointer">{{
                                            video.title
                                        }}</div>
                                        <p
                                            class="text-[14px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                                            {{ video.user.name }}
                                            <CheckCircle fillColor="#888888" :size="17" />
                                        </p>
                                        <div class="text-sm mb-1 text-gray-300 cursor-pointer">
                                            {{ Math.floor(Math.random() * 9999) + ' Views' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue';

const { dispatch, state } = useStore();
const videos = computed(() => state.videos);

let show = ref(false)
let width = ref(document.documentElement.clientWidth);

onMounted(() => {
    dispatch("getVideos");
    window.addEventListener('resize', () => {
        width.value = document.documentElement.clientWidth;
    });
});
</script>