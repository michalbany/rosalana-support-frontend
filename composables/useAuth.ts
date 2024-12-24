export function useAuth() {
  async function login(credentials: { email: string; password: string }) {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      await $fetch("/login", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    await csrf();
    const xsrfValue = useCookie("XSRF-TOKEN").value as string;
    try {
      await $fetch("/logout", {
        method: "POST",
        credentials: "include",
        baseURL: "http://localhost:8001",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfValue,
        },
      });
    } catch (error) {
      console.error(error);
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
    csrf,
  };
}
