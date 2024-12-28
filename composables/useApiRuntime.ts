import type { ApiOptions, ApiResponse, ApiReturn } from "~/types";

export function useApiRuntime<T>(
  url: string,
  options: ApiOptions<T> = { store: true }
): Promise<ApiReturn<T>> {
  const store = useRuntimeStore();
  if (options.store) {
    const cachedPromise = store.getCachedPromise(url);
    if (cachedPromise) {
      return cachedPromise as Promise<ApiReturn<T>>;
    }
  }

  // Extrahujeme per-request hooky
  const { onRequest, onResponse, onRequestError, onResponseError, ...restOptions } = options;

  // Přidáme per-request hooky do options pod speciálním klíčem
  const extendedOptions = {
    ...restOptions,
    perRequestHooks: {
      onRequestPer: onRequest,
      onResponsePer: onResponse,
      onRequestErrorPer: onRequestError,
      onResponseErrorPer: onResponseError,
    },
  };

  const fetchResult = useNuxtApp()
    .$api(url, {retry: 0, ...extendedOptions } as any & ApiOptions<T>)
    .then((response: any) => {
      // Pokud volání proběhlo OK, "response" by mělo mít:
      //   { data: T, message: string, permissions: any, ... } (dle definice)
      return {
        data: shallowRef(response.data ?? null),
        message: shallowRef(response.message ?? null),
        permissions: shallowRef(response.permissions ?? null),
        error: shallowRef(null),
      } as ApiReturn<T>;
    })
    .catch((error: any) => {
      let errorValue = error.response?._data?.error ?? error.response?._data?.errors ?? null;
      return {
        data: shallowRef(null),
        message: shallowRef(null),
        permissions: shallowRef(null),
        error: shallowRef(errorValue),
      };
    });

  if (options.store) {
    store.setCachedPromise(url, fetchResult);
  }

  return fetchResult as Promise<ApiReturn<T>>;
}
