<script setup lang="ts">
const data = await useApi<any>("/docs", {
    method: "GET",
});
</script>
<template>
    <NuxtLayout name="main">
        <pre class=" whitespace-pre-wrap">{{ data }}</pre>
    </NuxtLayout>
</template>