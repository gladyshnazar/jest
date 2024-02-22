import useEventListener from "./use-event-listener";

export default function useClickOutside(
  ref: React.MutableRefObject<any>,
  cb: (e?: MouseEvent) => void
) {
  useEventListener(
    "click",
    (e: MouseEvent) => {
      if (ref.current === null || ref.current.contains(e.target as Node))
        return;
      cb(e);
    },
    document
  );
}
