import type { UseFetchOptions } from "nuxt/app";

export type APIDataStructure<
  T extends Partial<{
    attributes: any;
    relationships: any;
    links: any;
  }> = {},
> = {
  type: string;
  id: number;
  attributes: T["attributes"] extends Record<string, any> ? T["attributes"] : Record<string, any>;
  relationships: T["relationships"] extends Record<string, any>
    ? T["relationships"]
    : Record<string, any>;
  links: T["links"] extends Record<string, any> ? T["links"] : Record<string, any>;
};

export interface ApiResponse<T> {
  message: string;
  data: T;
  permissions?: any;
}

export interface ApiOptions<T> extends UseFetchOptions<ApiResponse<T>> {
  fatal?: boolean;
  store?: boolean;
  silent?: boolean;
}

export interface ApiFetchOptions<T> extends ApiOptions<T> {
  perRequestHooks: {
    onRequestPer: ({ request, options }: { request?: any; options?: any }) => Promise<void> | void;
    onResponsePer: ({
      request,
      options,
      response,
    }: {
      request?: any;
      options?: any;
      response?: any;
    }) => Promise<void> | void;
    onResponseErrorPer: ({
      response,
      error,
      options,
    }: {
      response?: any;
      error?: any;
      options?: any;
    }) => Promise<void> | void;
  };
}

export interface ApiReturn<T> {
  data: Ref<T | null>;
  message: Ref<any>;
  permissions?: Ref<any>;
  pending: Ref<boolean>;
  error: Ref<any>;
  refresh: () => Promise<void>;
}
