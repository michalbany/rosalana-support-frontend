<template>
  <div class="mb-16 mt-12">
    <h1 class="mb-3 text-3xl font-bold"><slot name="title" /></h1>
    <p class="text-xs">
      <slot name="description" />
    </p>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
