<script setup lang="ts">
const props = defineProps<{
    content: string;
}>();
</script>
<template>
    <MDC :value="props.content" tag="article" class="github-markdown" />
</template>