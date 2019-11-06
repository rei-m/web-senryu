import { useMemo, useEffect, useCallback } from 'react';

// TODO: IFをPromiseベースじゃなくてRxベースにするか、PromiseをCancelするやつ的なのを入れるほうがきれいだけど妥協
export const useSafeResolve = () => {
  const holder = useMemo(() => ({ mounted: false }), []);

  useEffect(() => {
    holder.mounted = true;

    return () => {
      holder.mounted = false;
    };
  }, []);

  const safeResolve = useCallback(
    <T>(promise: Promise<T>) => (
      resolve: (t: T) => void,
      reject: (reason: any) => void
    ) => {
      promise
        .then(v => {
          if (holder.mounted) {
            resolve(v);
          }
        })
        .catch(e => {
          if (holder.mounted) {
            reject(e);
          }
        });
    },
    []
  );

  return { safeResolve };
};
