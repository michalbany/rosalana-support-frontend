import type { APIDataStructure } from "~/types";

type ResponseItem = {
  data: any;
  meta: any;
  permissions: any;
};
/**
 * Global store for response data
 * To share response data between components
 * When useApi is called with store all data comes from here
 * and is updated here as well
 */
export const useResponseStore = defineStore('responseStore', {
  state: () => ({
    data: null as APIDataStructure | null,
    message: null as Record<string, any> | null,
    permissions: null as Record<string, boolean> | null,
  }),

  actions: {
    set(payload: ResponseItem) {
      this.data = payload.data;
      this.message = payload.meta;
      this.permissions = payload.permissions;
    },
    /**
     * Je nutné aby API vracelo kompletní odpověď
     * @param payload Partial<ResponseItem> - object with data to update
     */
    update(payload: Partial<ResponseItem>) {
        this.data = {...(this?.data ?? {}), ...payload.data};
        this.message = {...(this?.message ?? {}), ...payload.meta};
        this.permissions = {...(this?.permissions ?? {}), ...payload.permissions};
    }
  },
});