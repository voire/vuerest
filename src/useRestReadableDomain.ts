import type { MaybeRef } from '@vueuse/core'
import type { Mapper, Numeric } from '@voire/type-utils'
import type { FetchOptions } from 'ohmyfetch'
import { useRestGet } from './useRestGet'
import { useRestRead } from './useRestRead'

export function useRestReadableDomain<
  TGetData extends {} = {},
  TGetModel extends {} = TGetData,
  TGetFilters extends {} = Partial<TGetData>,
  TReadData extends {} = TGetData,
  TReadModel extends {} = TGetModel,
  TReadFilters extends {} = TGetFilters,
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  getMapper: Mapper<TGetData, TGetModel>,
  readMapper: Mapper<TReadData, TReadModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return {
    get: useRestGet<TGetData, TGetModel, TGetFilters, TKey>(url, getMapper, domainOptions),
    read: useRestRead<TReadData, TReadModel, TReadFilters>(url, readMapper, domainOptions),
  }
}
