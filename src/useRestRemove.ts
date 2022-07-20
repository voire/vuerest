import type { MaybeRef } from '@vueuse/core'
import type { FetchOptions } from 'ohmyfetch'
import { $fetch } from 'ohmyfetch'
import { unref } from 'vue'
import type { Numeric } from '@voire/type-utils'
import { withTrailingSlash } from 'ufo'

export function useRestRemove<
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  domainOptions?: FetchOptions<'json'>,
) {
  return async (
    key: TKey,
    options?: FetchOptions<'json'>,
  ): Promise<void> => {
    await $fetch<void>(`${withTrailingSlash(unref(url))}${key}/`, {
      ...domainOptions,
      ...options,
      method: 'DELETE',
    })
  }
}
