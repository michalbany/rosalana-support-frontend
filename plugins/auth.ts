export default defineNuxtPlugin(async (nuxtApp) => {
  const { user } = useAuth();

  user.value = null;

  try {
    // Můžeš i rovnou useAuth().csrf() pokud je potřeba
    const response = await $fetch("/me", {
      method: "GET",
      credentials: "include",
      baseURL: "http://localhost:8001",
      headers: { Accept: "application/json" },
    });

    user.value = response;
  } catch (error) {
    user.value = null;
  }
});
