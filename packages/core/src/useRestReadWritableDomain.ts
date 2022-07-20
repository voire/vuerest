import type { Mapper, Numeric } from '@voire/type-utils'
import type { MaybeRef } from '@vueuse/core'
import type { FetchOptions } from 'ohmyfetch'
import { useRestReadableDomain } from './useRestReadableDomain'
import { useRestWritableDomain } from './useRestWritableDomain'

export function useRestReadWritableDomain<
  TGetData extends {} = {},
  TGetModel extends {} = TGetData,
  TGetFilters extends {} = Partial<TGetData>,
  TReadData extends {} = TGetData,
  TReadModel extends {} = TGetModel,
  TReadFilters extends {} = TGetFilters,
  TCreateForm extends {} = TGetData,
  TUpdateForm extends {} = Partial<TGetData>,
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  getMapper: Mapper<TGetData, TGetModel>,
  readMapper: Mapper<TReadData, TReadModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return {
    ...useRestReadableDomain<TGetData, TGetModel, TGetFilters, TReadData, TReadModel, TReadFilters, TKey>(url, getMapper, readMapper, domainOptions),
    ...useRestWritableDomain<TGetData, TGetModel, TCreateForm, TUpdateForm, TKey>(url, getMapper, domainOptions),
  }
}
