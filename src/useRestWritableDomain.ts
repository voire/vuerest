import type { MaybeRef } from '@vueuse/core'
import type { Mapper, Numeric } from '@voire/type-utils'
import type { FetchOptions } from 'ohmyfetch'
import { useRestCreate } from './useRestCreate'
import { useRestReplace } from './useRestReplace'
import { useRestUpdate } from './useRestUpdate'

export function useRestWritableDomain<
  TGetData extends {} = {},
  TGetModel extends {} = TGetData,
  TCreateForm extends {} = TGetData,
  TUpdateForm extends {} = Partial<TGetData>,
  TKey = Numeric,
>(
  url: MaybeRef<string>,
  getMapper: Mapper<TGetData, TGetModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return {
    create: useRestCreate<TGetData, TGetModel, TCreateForm>(url, getMapper, domainOptions),
    replace: useRestReplace<TGetData, TGetModel, TCreateForm, TKey>(url, getMapper, domainOptions),
    update: useRestUpdate<TGetData, TGetModel, TUpdateForm, TKey>(url, getMapper, domainOptions),
  }
}
