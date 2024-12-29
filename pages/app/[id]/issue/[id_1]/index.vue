<script setup lang="ts">
import type { APIDataStructure } from '~/types';

const {data: issue } = await useApi<APIDataStructure>('issues/' + useRoute().params.id_1, {
    method: 'GET',
    fatal: true,
    store: true,
});

useHead({
    title: issue?.value?.attributes.title,
});
</script>
<template>
    <NuxtLayout name="main">
        Hello on issue page
    </NuxtLayout>
</template>