import {
  useRoute,
  type RouteLocationNormalizedLoadedGeneric,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'
import type { SectionsQuery } from '@/types/sections'
import type { UncheckedMediaQuery } from '@/types/media'

export function getSectionsQueryFromRoute(
  route: RouteLocationNormalizedLoadedGeneric,
): SectionsQuery {
  const toArray = (val: string | string[] | undefined): string[] | undefined => {
    if (!val) return undefined
    if (Array.isArray(val)) return val
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  return {
    perch_mount_ids: toArray(route.query.perch_mount_ids as string | string[] | undefined),
    swapper_ids: toArray(route.query.swapper_ids as string | string[] | undefined),
    swapped_date_from: route.query.swapped_date_from as string | undefined,
    swapped_date_to: route.query.swapped_date_to as string | undefined,
  }
}

export function useMediaOperationQuery(route: RouteLocationNormalizedLoaded): UncheckedMediaQuery {
  const query = route.query
  const result: UncheckedMediaQuery = {}

  if (typeof query.perch_mount_ids === 'string') {
    result.perch_mount_ids = query.perch_mount_ids.split(',')
  } else {
    result.perch_mount_ids = []
  }

  if (typeof query.section_ids === 'string') {
    result.section_ids = query.section_ids.split(',')
  } else {
    result.section_ids = []
  }
  return result
}
