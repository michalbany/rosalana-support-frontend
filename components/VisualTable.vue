<script lang="ts" setup>
  import { useVisualTable, VTRender } from "~/composables/useVisualTable";
  import type { VTColumn, VTDisplayOptions, VTFilter } from "~/types";

  const props = withDefaults(
    defineProps<{
      columns: VTColumn[];
      data: any[] | any;
      displayType?: VTDisplayOptions;
      icon?: string;
      pageSize?: number;
      pageSizes?: number[];
      class?: any;
      extendColumns?: boolean;
      flatData?: boolean;
      filter?: VTFilter[];
      sort?: { key: string; direction: "asc" | "desc" };
      prefix?: string;
      showSelect?: boolean;
      showDisplayOption?: boolean;
      showColumnToggle?: boolean;
      showFilters?: boolean;
      showSearch?: boolean;
      showPagination?: boolean;
    }>(),
    {
      columns: () => [],
      data: () => [],
      displayType: "table",
      icon: "lucide:database",
      pageSize: 10,
      pageSizes: () => [10, 20, 50],
      extendColumns: false,
      flatData: false,
      filter: () => [],
      sort: () => ({ key: "id", direction: "asc" }),
      showSelect: false,
      showDisplayOption: true,
      showColumnToggle: true,
      showFilters: true,
      showSearch: true,
      showPagination: true,
    }
  );

  const checkBoxSelect: VTColumn = {
    key: "checkbox",
    header: () =>
      h(resolveComponent("UiCheckbox"), {
        checked: table.select.isAllSelected()
          ? true
          : table.select.isIndeterminate()
            ? "indeterminate"
            : false,
        "onUpdate:checked": () => table.select.toggleAll(),
        ariaLabel: "Select all",
      }),
    renderAs: (item: any) =>
      h(resolveComponent("UiCheckbox"), {
        checked: table.select.isSelected(item.id),
        "onUpdate:checked": () => table.select.toggle(item.id),
        ariaLabel: "Select item",
      }),
    bindToPosition: "checkbox",
    enableSort: false,
    enableFilter: false,
    enableToggle: false,
    enableSearch: false,
  };

  const localColumns = computed(() => {
    const cols = [...props.columns];
    if (props.showSelect) {
      cols.unshift(checkBoxSelect);
    }
    return cols;
  });

  // Stavy pro vyhledávání a filtrování
  const searchTerm = ref("");
  const displayType = ref<VTDisplayOptions>(props.displayType);
  const filters = ref<VTFilter[]>([{ column: "", operator: "===", value: "" }]);

  // Funkce pro třídění
  const sortBy = (key: string) => {
    table.setSort(key);
  };

  // Current filters
  const activeFilters = computed(() =>
    filters.value.filter((f) => f.column && f.operator && f.value)
  );

  const addFilter = () => {
    if (filters.value.length >= 5) {
      // Max 5 filters
      return;
    }
    filters.value.push({ column: "", operator: "===", value: "" });
  };

  const updateFilterOptions = (index: number) => {
    filters.value[index].value = "";
  };

  const removeFilter = (index: number) => {
    filters.value.splice(index, 1);
  };

  const clearAllFilters = () => {
    filters.value = [{ column: "", operator: "===", value: "" }];
  };

  // Filter logic
  const applySelectFilter = (item: any): boolean => {
    return activeFilters.value.every((filter) => {
      const itemValue = item[filter.column];
      const filterValue = filter.value;

      switch (filter.operator) {
        case "===":
          return itemValue == filterValue || String(itemValue).includes(String(filterValue));
        case "!==":
          return itemValue != filterValue && !String(itemValue).includes(String(filterValue));
        case ">":
          return itemValue >= filterValue;
        case "<":
          return itemValue <= filterValue;
        case "#":
          return filterValue.split(' ').some((word: string) => String(itemValue).includes(word));
        default:
          return true;
      }
    });
  };

  /**
   * Get filters from query string
   * ?filter-column=value
   * @returns void
   */
  const getFiltersFromQueryString = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryFilters: VTFilter[] = [];
    searchParams.forEach((value, key) => {
      const column = key.split("-")[1];
      // Remove existing filter for the column
      filters.value = filters.value.filter((f) => f.column !== column);
      queryFilters.push({ column, operator: "===", value });
    });
    filters.value.push(...queryFilters);
  };

  const getFiltersFromProps = () => {
    if (props.filter.length > 0) {
      filters.value.push(...props.filter);
    }
  };

  getFiltersFromProps();
  getFiltersFromQueryString();

  const applySearchFilter = (item: any) => {
    const searchTermLower = searchTerm.value.toLowerCase();
    const searchableColumns = table.columns.relevant.filter((col) => col.enableSearch);

    if (searchableColumns.length === 0) {
      return true;
    }

    return searchableColumns.some((col) => {
      const value = item[col.key];
      return value != null && value.toString().toLowerCase().includes(searchTermLower);
    });
  };

  // Funkce pro přepínání viditelnosti sloupce
  const toggleColumnVisibility = (key: string) => {
    table.toggleVisibility(key);
  };

  // Inicializace tabulky
  const table = useVisualTable({
    get data() {
      return props.data;
    },
    get columns() {
      return localColumns.value;
    },
    initialState: {
      pageSize: props.pageSize,
      sort: props.sort,
    },
    state: {
      get filter() {
        return (item: any) => applySearchFilter(item) && applySelectFilter(item);
      },
    },
    options: {
      extendedColumns: props.extendColumns,
      flatData: props.flatData,
      dataPrefix: props.prefix,
    },
  });

  const itemsPerPage = computed({
    get: () => String(table.paginator.pageSize),
    set: (value: string) => {
      table.paginator.pageSize = Number(value);
    },
  });


</script>

<template>
  <div :class="props.class">

    <div class="mb-5">
      <div class="flex justify-between">
        <div class="space-x-0 sm:space-x-2">
          <UiInput
            v-model="searchTerm"
            placeholder="Search..."
            v-if="showSearch"
            name="search"
            class="w-40 bg-zinc-200 transition focus:bg-zinc-300/60 inline-block dark:bg-zinc-800"
            @input="applySearchFilter"
            autocomplete="off"
          />
        </div>

          <!-- toggle columns visibility -->
          <UiDropdownMenu v-if="showColumnToggle">
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                <span>View</span>
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>

            <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
              <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />

              <UiDropdownMenuGroup>
                <UiDropdownMenuCheckboxItem
                  v-for="column in table.columns.toggleable"
                  :key="column.key"
                  :checked="column.hidden !== true"
                  @update:checked="toggleColumnVisibility(column.key)"
                >
                  <span class="text-sm capitalize">{{ column.header }}</span>
                </UiDropdownMenuCheckboxItem>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
    </div>

    <!-- Tabulka -->
    <template v-if="displayType === 'table'">
      <UiScrollArea class="calc-width" orientation="horizontal">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead
                v-for="column in table.columns.visible"
                :key="column.key"
                @click="sortBy(column.key)"
                :class="{
                  'cursor-pointer': column.enableSort,
                  'dark:text-zinc-600 text-zinc-400': !column.enableSort,
                }"
              >
                <div class="flex items-center">
                  <VTRender :content="column.header" :item="table" />
                  <Icon
                    v-if="table.sortState.value.key === column.key && column.enableSort"
                    :name="
                      table.sortState.value.direction === 'asc'
                        ? 'solar:double-alt-arrow-up-line-duotone'
                        : 'solar:double-alt-arrow-down-line-duotone'
                    "
                    class="size-4"
                  />
                </div>
              </UiTableHead>
            </UiTableRow>
          </UiTableHeader>

          <UiTableBody>
            <UiTableRow
              v-for="row in table.data.paginated"
              :key="row.id"
              :class="table.getRowStyle(row)"
            >
              <UiTableCell
                v-for="column in table.columns.visible"
                :key="column.key"
                :class="column.additionalColumn ? 'text-zinc-400' : ''"
              >
                <VTRender :content="column.content()" :item="row" />
              </UiTableCell>
            </UiTableRow>

            <UiTableEmpty
              v-if="table.data.paginated.length === 0"
              :colspan="table.columns.visible.length"
            >
              <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
                <Icon name="lucide:database" class="h-12 w-12 text-muted-foreground" />
                <span class="mt-2">No data available.</span>
              </div>
            </UiTableEmpty>
          </UiTableBody>
        </UiTable>
      </UiScrollArea>
    </template>

    <!-- paginator -->
    <div class="mt-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
      <div v-if="showPagination" class="flex items-center gap-3">
        <div class="whitespace-nowrap text-sm font-medium text-foreground">
          Page {{ table.paginator.currentPage }} of {{ table.paginator.totalPages }}
        </div>

        <UiSelect v-model="itemsPerPage" name="paginator">
          <UiSelectTrigger class="h-9 w-[70px]">
            {{ table.paginator.pageSize }}
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem
                v-for="size in props.pageSizes"
                :value="String(size)"
                :text="String(size)"
              />
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>

        <div class="space-x-2">
          <UiButton
            variant="outline"
            size="icon"
            title="First page"
            class="h-9 w-9 p-0"
            @click="table.paginator.currentPage = 1"
            :disabled="table.paginator.first"
            ><Icon name="solar:double-alt-arrow-left-linear"
          /></UiButton>

          <UiButton
            variant="outline"
            size="icon"
            class="h-9 w-9 p-0"
            title="Previous page"
            @click="table.paginator.prevPage()"
            :disabled="table.paginator.first"
            ><Icon name="solar:alt-arrow-left-linear"
          /></UiButton>

          <UiButton
            variant="outline"
            size="icon"
            class="h-9 w-9 p-0"
            title="Next page"
            @click="table.paginator.nextPage()"
            :disabled="table.paginator.last"
            ><Icon name="solar:alt-arrow-right-linear"
          /></UiButton>

          <UiButton
            variant="outline"
            size="icon"
            class="h-9 w-9 p-0"
            title="Last page"
            @click="table.paginator.currentPage = table.paginator.totalPages"
            :disabled="table.paginator.last"
            ><Icon name="solar:double-alt-arrow-right-linear"
          /></UiButton>
        </div>
      </div>
      <span
        v-show="table.data.filtered.length !== table.data.original.length"
        class="text-normal text-sm italic text-zinc-500"
        >{{ table.data.filtered.length }} items filtered</span
      >
    </div>
  </div>
</template>
<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
</style>
