# hydration-aware-persist

A zero-dependency package that extends Zustand's persist middleware with hydration awareness.

## Installation

```bash
npm install hydration-aware-persist
```
```bash
yarn add hydration-aware-persist
```
```bash
pnmpm install hydration-aware-persist
```

## Problem
The default Zustand persist middleware doesn't provide hydration status. This makes it difficult to determine whether a state hasn't been hydrated yet or simply doesn't exist in storage. This package solves that problem by adding a hydrated flag to your store.

## Usage
Import hydrationAwarePersist and WithHydration from this package instead of using persist from zustand/middleware:

```typescript
import { hydrationAwarePersist, WithHydration } from 'hydration-aware-persist';
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

const useMyStore = create<WithHydration<MyState>>(
  hydrationAwarePersist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: 'my-store',
    }
  )
);
```

When defining your store type, wrap it with WithHydration:
```typescript
const useStore = create<WithHydration<Store>>(
  hydrationAwarePersist(
    // ... your store configuration
  )
);
```
Now you can use the hydrated flag in your components:
```typescript
const { user, hydrated } = useUserStore();

useEffect(() => {
  if (!hydrated) return;
  // Now you can safely check if the user exists
  if (!user) {
    // Redirect user or show login prompt
  }
}, [hydrated, user]);
```

## API
The API is identical to Zustand's persist middleware, but with the addition of the hydrated flag in your store's state.


## Benefits
- Zero dependencies
- Fully compatible with Zustand's persist middleware API
- Provides hydration status out of the box
- Simplifies handling of asynchronous storage in SSR environments

## License
MIT