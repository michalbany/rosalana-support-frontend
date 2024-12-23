<template>
  <div>
    <div class="relative mt-3 rounded-xl border" style="background-image: url('/images/banner.jpg'); background-size: cover;">
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
      <div class="relative z-10 text-center flex flex-col items-center text-white justify-center pb-16 pt-12">
        <slot name="banner" />
      </div>
    </div>
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
