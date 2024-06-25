<template>
    <div class="xl:flex">
        <div v-if="video" class="p-3">
            <video :src="video.video || ''" controls autoplay />
            <div class="text-white text-2xl font-extrabold mt-4">{{ video.title }}</div>
            <div class="flex items-center mb-4">
                <img class="rounded-full mt-2 flex items-baseline w-12 h-12"
                    :src="`https://picsum.photos/id/${(Math.random() * 100).toFixed(0)}/100` || ''">
                <div class="pl-2 mt-1">
                    <div class="text-white text-lg font-extrabold flex items-center">
                        {{ video.user.name }}
                        <CheckCircle class="pl-2" fillColor="#888888" :size="17" />
                    </div>
                    <div class="text-gray-400 text-sm font-extrabold">{{ (Math.random() * 999999).toFixed(0) + ' Views' }}
                    </div>
                </div>
            </div>

            <div class="w-[500px] p-3">
                <div v-for="vid in videos" :key="vid">
                    <router-link :to="{ name: 'Video', params: { id: vid.id } }">
                        <div>
                            <img width="340" class="aspect-video cursor-pointer rounded-lg" :src="vid.thumbnail || ''" />
                        </div>


                        <div class="w-[500px]">
                            <div class="px-1.5 pl-3 text-white mt-1">
                                <div class="text-[15px] pb-1.5 font-extrabold w-full cursor-pointer">
                                    {{ vid.title }}
                                </div>

                                <p class="text-[12px] text-gray-300 font-extrabold flex gap-1 items-center cursor-pointer">
                                    {{ vid.user.name }}
                                    <CheckCircle fillColor="#888888" :size="15" />
                                </p>
                                <div class="text-xs mb-1 text-gray-300 cursor-pointer">
                                    {{
                                        (Math.random() * 999999).toFixed(0) +
                                        ' Views'
                                    }}
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue'
import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue'

const { dispatch } = useStore();
const route = useRoute();
const video = ref(null);
const videos = ref(null);

const getVideo = () => {
    dispatch("getVideo", route.params.id).then(({ data }) => {
        video.value = data.video[0];
        videos.value = data.videos;
    });
};

watch(route, () => getVideo());
onMounted(() => getVideo());
</script>