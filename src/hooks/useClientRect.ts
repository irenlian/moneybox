import { useCallback, useState } from 'react';

const useClientRect = (): [ClientRect | undefined, (node: HTMLElement | null) => void] => {
  const [rect, setRect] = useState<ClientRect>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
};

export default useClientRect;
