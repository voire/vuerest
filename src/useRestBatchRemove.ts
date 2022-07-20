import type { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'

export function useRestBatchRemove<
  TFilters extends {} = {},
>(
  url: MaybeRef<string>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    filters?: TFilters,
    options?: FetchOptions<'json'>,
  ): Promise<void> => {
    await $fetch(unref(url), {
      ...domainOptions,
      ...options,
      method: 'DELETE',
      params: filters ?? options?.params,
    })
  }
}
