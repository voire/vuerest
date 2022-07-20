import type { Mapper, Numeric } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'
import { withTrailingSlash } from 'ufo'
import { unref } from 'vue'

export function useRestUpdate<
  TData extends {} = {},
  TModel extends {} = TData,
  TForm extends {} = Partial<TData>,
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  mapper: Mapper<TData, TModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    key: TKey,
    data: TForm,
    options?: FetchOptions<'json'>,
  ): Promise<TModel> => {
    const res = await $fetch<TData>(`${withTrailingSlash(unref(url))}${key}/`, {
      ...domainOptions,
      ...options,
      method: 'PATCH',
      body: data,
    })
    return mapper(res)
  }
}
