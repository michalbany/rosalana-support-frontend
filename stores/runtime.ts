type RuntimeItem = any;

interface CachedPromise {
  promise: Promise<RuntimeItem>;
  timestamp: number;
}

/**
 * Global store for runtime Promise objects
 * To share promises between components
 *
 */
export const useRuntimeStore = defineStore("runtimeStore", {
  state: () => ({
    cache: {} as Record<string, CachedPromise>,
  }),

  actions: {
    getCachedPromise(key: string): Promise<any> | null {
      const cached = this.cache[key];
      if (cached) {
        const now = Date.now();
        if (now - cached.timestamp < 5 * 60 * 1000) {
          // Pokud je cache mladší než 5 minut, vrátíme uložený Promise
          return cached.promise;
        } else {
          // Jinak cache odstraníme
          delete this.cache[key];
        }
      }
      return null;
    },

    setCachedPromise(key: string, promise: Promise<any>) {
      this.cache[key] = {
        promise,
        timestamp: Date.now(),
      };
    },

    deleteCachedPromise(key: string) {
      delete this.cache[key];
    },
  },
});
