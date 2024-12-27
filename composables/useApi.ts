import type { ApiOptions, ApiResponse, ApiReturn } from "~/types";

/**
 * Use for initial fetch of data for whole page
 * @todo Store request as `CurrentData` in Pinia
 * @param url destination url
 * @param options options for the fetch
 * @returns destructured object with data
 */
export function useApi<T>(url: string | (() => string), options: ApiOptions<T> = {}) {
  const fetchResult = useFetch<ApiResponse<T>>(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });

  const { data: responseData, ...rest } = fetchResult;

  let result: ApiReturn<T>;

  if (options.store) {
    const responseStore = useResponseStore();
    // Sledujeme změny v responseData a aktualizujeme store
    watch(
      responseData,
      (newValue) => {
        if (newValue) {
          responseStore.set({
            data: newValue.data,
            meta: newValue.message,
            permissions: newValue.permissions,
          });
        }
      },
      { immediate: true }
    );

    result = {
      ...rest,
      data: computed(() => responseStore.data),
      message: computed(() => responseStore.message),
      permissions: computed(() => responseStore.permissions),
    } as ApiReturn<T>;
  } else {
    const ComData = computed(() => responseData.value?.data ?? null);
    const ComMeta = computed(() => responseData.value?.message ?? null);
    const ComPermissions = computed(() => responseData.value?.permissions ?? null);

    result = {
      ...rest,
      data: ComData,
      message: ComMeta,
      permissions: ComPermissions,
    } as ApiReturn<T>;
  }

  /** Vlastní promise při await */
  const promise = new Promise((resolve, reject) => {
    fetchResult
      .then(() => {
        resolve({
          ...result,
        });
      })
      .catch(reject);
  }) as Promise<ApiReturn<T>>;

  return Object.assign(promise, result) as Promise<ApiReturn<T>> & ApiReturn<T>;
}
