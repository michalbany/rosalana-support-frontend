import type { ApiResponse } from "~/types";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { user } = useAuth();
  user.value = null;
  await useApiRuntime('/me', {
    store: false,
    method: "GET",
    onResponse: ({ response }) => {
      user.value = response._data.data;
    },
    onRequestError: () => {
      user.value = null;
    }
  });
});
