import { useEffect, useRef } from "react";

export default function useEventListener(
  eventType: string,
  callback: (e?: any) => void,
  element: any = window
) {
  /* Ensures the most up-to-date version of callback function,
  preventing potential bugs with closures and capturing stale references */
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: any) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
