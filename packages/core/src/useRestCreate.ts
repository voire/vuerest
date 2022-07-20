import type { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'
import type { Mapper } from '@voire/type-utils'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'

export function useRestCreate<
  TData extends {} = {},
  TModel extends {} = TData,
  TForm extends {} = TData,
>(
  url: MaybeRef<string>,
  mapper: Mapper<TData, TModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    data: TForm,
    options?: FetchOptions<'json'>,
  ): Promise<TModel> => {
    const res = await $fetch<TData, 'json'>(unref(url), {
      ...domainOptions,
      ...options,
      method: 'POST',
      body: data,
    })
    return mapper(res)
  }
}
