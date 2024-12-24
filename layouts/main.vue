<template>
  <div>
    <div
      class="relative mt-3 rounded-xl border"
      style="background-image: url(&quot;/images/banner.jpg&quot;); background-size: cover"
    >
      <div class="relative z-50 flex h-20 w-full items-center justify-between px-4 sm:px-8">
        <AppLogo />

        <div class="sm:hidden">
          <UiButton size="icon" variant="secondary">
            <Icon name="lucide:menu" class="h-4 w-4" />
          </UiButton>
        </div>
        <div v-if="!useAuth().autentificated()" class="hidden items-center gap-4 sm:flex">
          <UiButton size="sm" variant="secondary" @click="navigateTo('/auth/register')">Sign Up</UiButton>
          <UiButton size="sm" @click="navigateTo('/auth/login')">Sign In</UiButton>
        </div>
        <div v-else class="hidden items-center gap-4 sm:flex">
          <UiButton size="sm" @click="useAuth().logout()">Logout</UiButton>
        </div>
      </div>
      <div
        class="relative z-10 flex flex-col items-center justify-center pb-16 pt-12 text-center text-white"
      >
        <slot name="banner" />
      </div>
    </div>
    <UiButton @click="navigateTo('/admin')">Admin</UiButton>
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
