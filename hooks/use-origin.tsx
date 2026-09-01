import { useSyncExternalStore } from "react";

export const useOrigin = () => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) {
    return "";
  }

  return typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
};
