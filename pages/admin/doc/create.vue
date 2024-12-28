<script setup lang="ts">
const md = `
# Hello
`
</script>
<template>
    <MDC :value="md" tag="article" class="github-markdown" />
</template>