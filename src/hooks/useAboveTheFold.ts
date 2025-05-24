import { useEffect, useState } from 'react';

export const useAboveTheFoldCount = (): number => {
  const [count, setCount] = useState(getAboveTheFoldCount())

  function getAboveTheFoldCount() {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1200)  return 9; // 3x3
    if (innerWidth >= 900)   return 6; // 3x2
    if (innerWidth >= 600)   return 4; // 2x2
    return 2;                          // 1x2
  }

  useEffect(() => {
    const onResize = () => setCount(getAboveTheFoldCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return count
}
