type Payload = {
    data: {
      type: string;
      id: string | number | null;
      attributes?: Record<string, any>;
      relationships?: Record<string, any>;
    };
  };
  
  type AddTarget = "attributes" | "relationships";
  
  type Condition = boolean | (() => boolean);
  
  export function useRequestBuilder(initialData: {
    type: string;
    id: string | number | null;
    attributes?: Record<string, any>;
    relationships?: Record<string, any>;
  }) {
    const payload: Payload = {
      data: {
        type: initialData.type,
        id: initialData.id,
        attributes: initialData.attributes || {},
        relationships: initialData.relationships || {},
      },
    };
  
    /**
     * Add data to payload
     * @param target AddTarget
     * @param data any
     * @returns self
     */
    function add(target: AddTarget, data: Record<string, any> | (() => Record<string, any>)) {
      const value = typeof data === "function" ? data() : data;
      if (!payload.data[target]) {
        payload.data[target] = {};
      }
      Object.assign(payload.data[target], value);
      return builder;
    }
  
    /**
     * Add data to payload only when condition is true
     * @param condition boolean | () => boolean
     * @param target AddTarget
     * @param data Record<string, any> | () => Record<string, any>
     * @returns self
     */
    function addWhen(
      condition: Condition,
      target: AddTarget,
      data: Record<string, any> | (() => Record<string, any>)
    ) {
      const shouldAdd = typeof condition === "function" ? condition() : condition;
      if (shouldAdd) {
        add(target, data);
      }
      return builder;
    }
  
    /**
     * Build the final payload
     * @returns Payload
     */
    function build() {
      // Odstraníme prázdné objekty, pokud jsou prázdné
      if (payload.data.attributes && Object.keys(payload.data.attributes).length === 0) {
        delete payload.data.attributes;
      }
      if (payload.data.relationships && Object.keys(payload.data.relationships).length === 0) {
        delete payload.data.relationships;
      }
      return payload;
    }
  
    const builder = {
      add,
      addWhen,
      build,
    };
  
    return builder;
  }
  