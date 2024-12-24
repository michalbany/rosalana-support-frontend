/**
 * Middleware pro routy
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Pravidla pro jednotlivé routy
  const routes: Record<string, Array<() => any>> = {
    "/auth/login": [guest],
    "/auth/register": [guest],
  };

  if (routes[to.path]) {
    for (const ruleFn of routes[to.path]) {
      const result = ruleFn();
      if (result) {
        return result;
      }
    }
  }
});

function guest() {
  if (useAuth().autentificated()) {
    return navigateTo("/");
  }
}

function auth() {
  if (!useAuth().autentificated()) {
    return navigateTo("/auth/login");
  }
}
