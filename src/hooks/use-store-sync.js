import { useEffect, useState } from "react";

export function useStoreSync(initialLoader) {
  const [data, setData] = useState(initialLoader);

  useEffect(() => {
    const refresh = () => setData(initialLoader());
    refresh();
    window.addEventListener("aurora-store-update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("aurora-store-update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [initialLoader]);

  return [data, () => setData(initialLoader())];
}
