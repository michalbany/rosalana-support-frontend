<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
  titleTemplate: `%s | ${config.public.appName}`,
});

</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <!-- <UiVueSonner /> -->
    </NuxtLayout>
  </div>
</template>

<style>
/* loading spinner */
body {
  background-color: #f1f5f9;
}

body::before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24'%3E%3Cg stroke='%23cbd5e1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-linecap='round' stroke-width='3'%3E%3Canimate attributeName='stroke-dasharray' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0 150;42 150;42 150;42 150'/%3E%3Canimate attributeName='stroke-dashoffset' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0;-16;-59;-59'/%3E%3C/circle%3E%3CanimateTransform attributeName='transform' dur='2s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E");
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%); /* Centrum SVG */
}

</style>
