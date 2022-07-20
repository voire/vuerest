import type { Mapper } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'
import { unref } from 'vue'

export function useRestRead<
  TData extends {} = {},
  TModel extends {} = TData,
  TFilters extends {} = Partial<TData>,
>(
  url: MaybeRef<string>,
  mapper: Mapper<TData, TModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    filters?: TFilters,
    options?: FetchOptions<'json'>,
  ): Promise<TModel> => {
    const res = await $fetch<TData>(unref(url), {
      ...domainOptions,
      ...options,
      method: 'GET',
      params: filters ?? options?.params,
    })
    return mapper(res)
  }
}
