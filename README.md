## vuerest
Set of composables for RESTful API calls in Clean architecture.

![vuerest](.github/banner.jpg)

# Usage

## Methods

Generate and use type safe methods to call RESTful API.
```ts
const readUsers = useRestRead<TDataFromAPI, TUserModel, TFilters>('/api/users', mapDataToUser)

...
const mappedUsers = await read({ status: 'active' })
```

**All methods:**
| name | corresponding RESTful method |
| --- | --- |
| `useRestRead` | GET |
| `useRestFind` | GET by id |
| `useRestCreate` | POST |
| `useRestReplace` | PUT |
| `useRestUpdate` | PATCH |
| `useRestRemove` | DELETE |


## Domains

This makes more sense if we use not just separated methods but whole domains - sets of different methods for one API app.

Let's say, we have an API app with read (GET), find (GET by id), and create (POST) methods. In this case, we may just generate multiple methods with one combined composable:
```ts
const { find, read, create, update, replace, remove } = useRestReadableDomain<...>( ... )
```
Or even for all the RESTful methods:
```ts
const { find, read, create, } = useRestDomain<...>( ... )
```

You can use these combinations just as composables or move such logic onto separated level using it as a part of some domain-specific store.

**All domain methods:**
| name | returned methods |
| --- | --- |
| `useRestReadableDomain` | `read`, `find` |
| `useRestWritableDomain` | `create`, `replace`, `update` |
| `useRestReadWritableDomain` | `read`, `find`, `create`, `replace`, `update` |
| `useRestDomain` | `read`, `find`, `create`, `replace`, `update`, `remove` |

### Custom methods' combinations

Feel free to 'construct' your own composables for specific domains with separated methods:
```ts
export function useThatOneDomain<...>(
  url: MaybeRef<string>,
  getMapper: Mapper<TGetData, TGetModel>,
  readMapper: Mapper<TReadData, TReadModel>,
  domainOptions?: FetchOptions<'json'>,
) {
  return {
    ...useRestReadableDomain<...>(url, getMapper, readMapper, domainOptions),
    create: useRestCreate<...>(url, getMapper, domainOptions),
    remove: useRestRemove<TKey>(url, domainOptions),
  }
}
```

## Yeah, but ...why?

It's all about Clean architecture and separating business logic / app logic and UI.

Let's say, we describe our business entities with _Data_ (representation fetched from API) and _Models_ (representation we use on client side).

```ts
type RecordData = {
  id: number
  created_at: string
}

type RecordModel = {
  id: number
  createdAt: Date
}
```

So, we need to refer to the API, get raw data and map it into client-acceptable model that will be comfortable to use within all the front-end application.
```ts
function mapRecord(data: RecordData): RecordModel {
  return {
    id: data.id,
    createdAt: new Date(data.created_at),
  }
}
```

Also, probably we will want to create typed domain just only one time (in some state) instead of specifing typings on every call inside a component.

If your approach to writing enterprise applications is quite similar, maybe these composables meet your needs.

## Nuxt module

Check [this repo](https://github.com/voire/nuxt-vuerest) to auto import the composables in your Nuxt application.

> **Note**
>
> Only Nuxt 3 is supported
