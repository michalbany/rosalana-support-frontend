import type { ApiResponse } from "~/types";

const useUser = () => useState<any | null>("user", () => null)

export function useAuth() {

  const user = useUser();

  const baseURL = useRuntimeConfig().public.apiBaseUrl;

  async function login(credentials: { email: string; password: string }) {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      const response = await $fetch<ApiResponse>("/login", {
        method: "POST",
        credentials: "include",
        baseURL: baseURL,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
        body: JSON.stringify(credentials),
      });

      user.value = response.data;
      
      return [true, response];
    } catch (error) {
      user.value = null;
      return [false, error];
    }
  }

  async function logout() {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      const response = await $fetch<ApiResponse>("/logout", {
        method: "POST",
        credentials: "include",
        baseURL: baseURL,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
      });

      user.value = null;
      return [true, response];
    } catch (error) {
      return [false, error];
    }
  }

  async function register(credentials: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      const response = await $fetch<ApiResponse>("/register", {
        method: "POST",
        credentials: "include",
        baseURL: baseURL,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
        body: JSON.stringify(credentials),
      });

      user.value = response.data;
      return [true, response];
    } catch (error) {
      user.value = null;
      return [false, error];
    }
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
  };
}
