import { useCallback } from "react";

export default function useRouter() {
  const push = useCallback(() => {}, []);
  const replace = useCallback(() => {}, []);

  return {
    push,
    replace,
  };
}
