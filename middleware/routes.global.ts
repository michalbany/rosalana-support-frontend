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
  // Tady bys ověřil, zda je user přihlášen (např. check cookie, store, cokoliv)
  const isLoggedIn = false; // dummy

  if (isLoggedIn) {
    return navigateTo("/");
  }
}

function auth() {
  const isLoggedIn = false; // dummy

  if (!isLoggedIn) {
    // Přesměrování, pokud user není lognutý
    return navigateTo("/auth/login");
  }
}
