import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SiteContext = createContext();

const DEFAULT_CATEGORIES = [
  { id: 'long-form', label: 'Long-Form' },
  { id: 'short-form', label: 'Short-Form' },
];

export const SiteProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('farhat_theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('farhat_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const markLoaded = useCallback(() => setIsLoaded(true), []);

  const addCategory = useCallback((label) => {
    const id = label.toLowerCase().replace(/\s+/g, '-');
    setCategories((prev) => {
      if (prev.some((c) => c.id === id)) return prev;
      return [...prev, { id, label }];
    });
  }, []);

  const removeCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <SiteContext.Provider
      value={{
        isLoaded,
        markLoaded,
        reduceMotion,
        setReduceMotion,
        animationsEnabled,
        setAnimationsEnabled,
        categories,
        addCategory,
        removeCategory,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);
