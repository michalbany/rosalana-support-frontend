<template>
  <div class="flex grow flex-col items-center justify-center mt-14">
    <div
      class="rounded-xl p-12"
      style="background-image: url(&quot;/images/banner.jpg&quot;); background-size: cover"
    >
    <div class="text-white mb-5">
        <slot name="title" />
    </div>
      <div class="rounded-lg bg-white dark:bg-zinc-900 dark:text-white p-8 sm:w-[350px]">
        <slot />
      </div>
    </div>
  </div>
</template>
