<template>
    <div class="max-w-xl mx-auto px-4 ">
        <div class="text-white font-extrabold text-3xl py-10">{{ heading }}</div>
        <slot />
    </div>
</template>

<script setup>
const props = defineProps(['heading']);
</script>