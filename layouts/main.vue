<template>
  <div>
    <div class="relative mt-3 rounded-xl border">
      <div
        class="absolute h-full w-full bg-[radial-gradient(#fecdd3_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      ></div>
      <div class="relative z-50 flex h-20 w-full items-center justify-between px-4 sm:px-8">
        <AppLogo />

        <div class="sm:hidden">
          <UiButton size="icon" variant="secondary">
            <Icon name="lucide:menu" class="h-4 w-4" />
          </UiButton>
        </div>
        <div class="hidden sm:flex items-center gap-4">
          <UiButton size="sm" variant="secondary">Sign Up</UiButton>
          <UiButton size="sm">Sign In</UiButton>
        </div>
      </div>
      <div class="relative z-10 text-center flex flex-col items-center justify-center pb-16 pt-12">
        <slot name="banner" />
      </div>
    </div>
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
