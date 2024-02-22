import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue(newValue?: boolean) {
    setValue((curr: boolean) =>
      typeof newValue === "boolean" ? newValue : !curr
    );
  }

  return [value, toggleValue] as const;
}
