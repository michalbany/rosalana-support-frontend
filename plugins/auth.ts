import type { ApiResponse } from "~/types";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user } = useAuth();
  const baseURL = useRuntimeConfig().public.apiBaseUrl;

  user.value = null;

  try {
    // Můžeš i rovnou useAuth().csrf() pokud je potřeba
    const response = await $fetch<ApiResponse>("/me", {
      method: "GET",
      credentials: "include",
      baseURL: baseURL,
      headers: { Accept: "application/json" },
    });

    user.value = response.data;
  } catch (error) {
    user.value = null;
  }
});
