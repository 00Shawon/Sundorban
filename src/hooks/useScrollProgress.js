import { useEffect, useState } from 'react';

export const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // When element top hits bottom of viewport, progress = 0
      // When element bottom leaves top of viewport, progress = 1
      const startScroll = windowHeight;
      const endScroll = -elementHeight;
      const scrollRange = startScroll - endScroll;
      const currentScroll = elementTop - endScroll;
      
      const calculatedProgress = 1 - (currentScroll / scrollRange);
      const clampedProgress = Math.max(0, Math.min(1, calculatedProgress));
      
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};
