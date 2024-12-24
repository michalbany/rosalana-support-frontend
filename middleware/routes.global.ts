/**
 * Middleware pro routy
 */
export default defineNuxtRouteMiddleware((to) => {
  // Pravidla pro jednotlivé routy
  const routes: Record<string, Array<() => any>> = {
    "/auth/*": [guest],
    "/admin/*": [auth],
  };

  const matchedRoute = Object.keys(routes).find((route) => routeMatch(route, to.path));
  if (matchedRoute) {
    for (const ruleFn of routes[matchedRoute]) {
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
