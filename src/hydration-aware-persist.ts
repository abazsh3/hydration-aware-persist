import { StateCreator, StoreMutatorIdentifier } from 'zustand'
import { PersistOptions, persist } from 'zustand/middleware'

export type WithHydration<T> = T & {
  hydrated: boolean
}

type HydrationAwarePersist = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T,
>(
  initializer: StateCreator<T, [...Mps, ['zustand/persist', unknown]], Mcs>,
  options: PersistOptions<T, U>
) => StateCreator<WithHydration<T>, Mps, [['zustand/persist', U], ...Mcs]>

function withHydration<T>(
  config: StateCreator<T, [], []>,
  options: PersistOptions<T>
): StateCreator<T, [], []> {
  return (set, get, api) => {
    return persist(config, {
      ...options,
      onRehydrateStorage: (state) => {
        const userOnRehydrate = options.onRehydrateStorage?.(state)
        return (state, error) => {
          userOnRehydrate?.(state, error)
          if (!error) {
            set({ hydrated: true } as Partial<WithHydration<T>>)
          }
        }
      },
    })(set, get, api)
  }
}

export const hydrationAwarePersist = withHydration as HydrationAwarePersist
