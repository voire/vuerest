import type { MaybeRef } from '@vueuse/core'
import type { Mapper, Numeric } from '@voire/type-utils'
import type { FetchOptions } from 'ohmyfetch'
import { useRestReadWritableDomain } from './useRestReadWritableDomain'
import { useRestDelete } from './useRestDelete'

export function useRestDomain<
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
    ...useRestReadWritableDomain<TGetData, TGetModel, TGetFilters, TReadData, TReadModel, TReadFilters, TCreateForm, TUpdateForm, TKey>(url, getMapper, readMapper, domainOptions),
    delete: useRestDelete<TKey>(url, domainOptions),
  }
}
