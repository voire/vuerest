import type { MaybeRef } from '@vueuse/core'
import type { Mapper, Numeric } from '@voire/type-utils'
import { unref } from 'vue'
import { withTrailingSlash } from 'ufo'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'

export function useRestFind<
  TData extends {} = {},
  TModel extends {} = TData,
  TFilters extends {} = Partial<TData>,
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  mapper: Mapper<TData, TModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    key: TKey,
    filters?: TFilters,
    options?: FetchOptions<'json'>,
  ): Promise<TModel> => {
    const res = await $fetch<TData>(`${withTrailingSlash(unref(url))}${key}/`, {
      ...domainOptions,
      ...options,
      method: 'GET',
      params: filters ?? options?.params,
    })
    return mapper(res)
  }
}
