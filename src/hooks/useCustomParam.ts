import { useSearchParams } from "react-router-dom";

type Defaults<T extends Record<string, string>> = Partial<T>;

export const useCustomParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (query: string) => {
    return searchParams.get(query);
  };

  const updateQuery = (key: string, value: string) => {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);

      if (value === "" || value == null) sp.delete(key);
      else sp.set(key, value);

      return sp;
    });
  };

  const updateMany = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);

      for (const [k, v] of Object.entries(updates)) {
        if (!v) sp.delete(k);
        else sp.set(k, v);
      }

      return sp;
    });
  };

  const getMany = <T extends Record<string, string>>(
    keys: (keyof T)[],
    defaults?: Defaults<T>,
  ): T => {
    const out = {} as T;

    keys.forEach((k) => {
      const key = String(k);
      const val = searchParams.get(key);

      (out as any)[k] = val ?? defaults?.[k] ?? "";
    });

    return out;
  };

  return {
    getParam,
    updateQuery,
    updateMany,
    getMany,
  };
};
