<script setup lang="ts">
  useHead({
    title: "Home",
  });
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <h1 class="text-3xl mb-3 font-bold text-zinc-800">Support & Documentation</h1>
      <p class="text-xs text-rose-500">
        Need help with something? Check out our most frequently asked questions.
      </p>
      <input
        type="text"
        placeholder="Search"
        class="mt-3 rounded-full border border-rose-200 bg-transparent p-1 px-2"
      />
    </template>

    <h2 class="mt-12 text-2xl font-bold text-zinc-800">Aplications</h2>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        class="flex justify-center text-center"
        title="Rosalana"
        description="a social network focused on creativity and creative expression"
        icon="custom:rosalana-logo"
      />
      <UiCard
        class="flex justify-center text-center"
        title="Blueprint"
        description="a platform focused on facilitating communication between agencies and clients"
        icon="custom:blueprint-logo"
      />
      <UiCard
        class="flex justify-center text-center"
        title="ProxyMa"
        description="a CMS system designed based on a single central administration"
        icon="custom:proxyma-logo"
      />
    </div>

    <h2 class="mt-12 text-2xl font-bold text-zinc-800">General FAQs</h2>
  </NuxtLayout>
</template>
