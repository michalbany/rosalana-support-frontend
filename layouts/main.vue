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
          <UiButton size="sm" variant="secondary" @click="navigateTo('/auth/register')"
            >Sign Up</UiButton
          >
          <UiButton size="sm" @click="navigateTo('/auth/login')">Sign In</UiButton>
        </div>
        <div v-else class="hidden items-center gap-4 sm:flex">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiAvatar
                :fallback="inicials(useAuth().user.value?.name)"
                class="h-12 w-12 cursor-pointer"
                fallbackClass="bg-white"
              />
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="mr-8 w-36">
              <UiDropdownMenuLabel :label="useAuth().user.value?.name" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                title="Home"
                @click="navigateTo('/')"
                icon="lucide:home"
                class="cursor-pointer"
                :class="{
                  'text-action hover:text-action bg-zinc-200 hover:bg-zinc-200 dark:bg-slate-600/80':
                    $router.currentRoute.value.path === '/',
                }"
              />
              <UiDropdownMenuItem
                title="Profile"
                disabled
                icon="lucide:user"
                :class="{
                  'text-action hover:text-action bg-zinc-200 hover:bg-zinc-200 dark:bg-slate-600/80':
                    $router.currentRoute.value.path === `/users/${useAuth().user.value?.id}`,
                }"
              />
              <UiDropdownMenuItem
                title="Admin"
                v-if="useAuth().user.value?.is_admin"
                @click="navigateTo('/admin')"
                class="cursor-pointer"
                icon="lucide:pencil-ruler"
                :class="{
                  'text-action hover:text-action bg-zinc-200 hover:bg-zinc-200 dark:bg-slate-600/80':
                    $router.currentRoute.value.path.startsWith('/admin'),
                }"
              />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                title="Logout"
                icon="lucide:log-out"
                class="cursor-pointer"
                @click="useAuth().logout()"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <div
        class="relative z-10 flex flex-col items-center justify-center pb-16 pt-12 text-center text-white"
      >
        <slot name="banner" />
      </div>
    </div>
    <div class="mt-12">
      <slot />
    </div>
  </div>
</template>
