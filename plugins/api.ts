import type { ApiFetchOptions, ApiOptions } from "~/types";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  const $api = $fetch.create({
      baseURL: config.public.apiBaseUrl,
      async onRequest({ request, options, error }) {
        if (options.method !== "GET") {
            await useAuth().csrf();
        }


        const cookie = useAuth().cookie('XSRF-TOKEN');
        options.credentials = "include";
        options.headers = {
            ...options.headers,
            // @ts-ignore
            "X-XSRF-TOKEN": cookie,
        }

      // Zavoláme per-request onRequest hook, pokud je definován
      const perRequestHooks = (options as ApiFetchOptions<any>).perRequestHooks || {};
      if (typeof perRequestHooks.onRequestPer === "function") {
        perRequestHooks.onRequestPer({ request, options });
      }
    },
    async onResponseError({ response, options }) {
      const apiOptions = options as ApiOptions<any>;
      if (apiOptions.fatal) {
        showError({
          statusCode: response.status,
          statusMessage: response.statusText,
          fatal: true,
        });
      } else {
        useSonner.error(response.statusText, {
          description:
            response._data.error || response._data.message ||
            "There was an error when fetching data from the server please refresh the page or try again later.",
        });
      }
      // Zavoláme per-request onResponseError hook, pokud je definován
      const perRequestHooks = (options as ApiFetchOptions<any>).perRequestHooks || {};
      if (typeof perRequestHooks.onResponseErrorPer === "function") {
        perRequestHooks.onResponseErrorPer({ response, options });
      }
    },
    onResponse({ response, options }) {
      // Globální onResponse logika

      // Zavoláme per-request onResponse hook, pokud je definován
      const perRequestHooks = (options as ApiFetchOptions<any>).perRequestHooks || {};
      if (typeof perRequestHooks.onResponsePer === "function" && response.ok) {
        perRequestHooks.onResponsePer({ response, options });
      }
    },
  });
  return {
    provide: {
      api: $api,
    },
  };
});
