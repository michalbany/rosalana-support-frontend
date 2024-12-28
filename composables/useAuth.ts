
const useUser = () => useState<any | null>("user", () => null)

export function useAuth() {

  const user = useUser();

  const baseURL = useRuntimeConfig().public.apiBaseUrl;

  async function login(credentials: { email: string; password: string }) {
    return await useApiRuntime('/login', {
      store: false,
      method: "POST",
      body: JSON.stringify(credentials),
      onResponse: ({ response }) => {
        user.value = response._data.data;
        useSonner.success(response._data.message);
      },
      onResponseError: ({ response }) => {
        user.value = null;
      }
    });
  }

  async function logout() {
    return await useApiRuntime('/logout', {
      store: false,
      method: "POST",
      silent: true,
      onResponse: () => {
        user.value = null;
        navigateTo("/");
      },
      onResponseError: () => {
        user.value = null;
        navigateTo("/");
      }
    });
  }

  async function register(credentials: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {

    return await useApiRuntime('/register', {
      store: false,
      method: "POST",
      body: JSON.stringify(credentials),
      onResponse: ({ response }) => {
        user.value = response._data.data;
        useSonner.success(response._data.message);
      },
      onResponseError: ({ response }) => {
        user.value = null;
      }
    });
  }

  async function csrf() {
    try {
      await $fetch("sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
        baseURL: baseURL,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    autentificated: () => {
      return useCookie("RA-TOKEN").value ? true : false;
    },
    login,
    logout,
    register,
    csrf,
    user,
    cookie: (name: 'RA-TOKEN' | 'XSRF-TOKEN') => useCookie(name).value as string
  };
}
