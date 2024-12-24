const useUser = () => useState<any | null>("user", () => null)

export function useAuth() {

  const user = useUser();

  async function login(credentials: { email: string; password: string }) {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      const response = await $fetch("/login", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
        body: JSON.stringify(credentials),
      });

      user.value = response;

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
      const response = await $fetch("/logout", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
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
      const response = await $fetch("/register", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
        body: JSON.stringify(credentials),
      });

      user.value = response;
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
        baseURL: "http://localhost:8001",
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
