import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SiteContext = createContext();

const DEFAULT_CATEGORIES = [
  { id: 'long-form', label: 'Long-Form' },
  { id: 'short-form', label: 'Short-Form' },
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Midnight Echoes',
    category: 'Long-Form',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2024',
    description: 'A cinematic short exploring the echoes of memory through light and shadow.',
    featured: true,
    status: 'published',
  },
  {
    id: 2,
    title: 'Velocity',
    category: 'Short-Form',
    youtubeId: 'LXb3EKWsInQ',
    year: '2024',
    description: 'High-energy automotive commercial with precision editing and dynamic transitions.',
    featured: true,
    status: 'published',
  },
  {
    id: 3,
    title: 'Pulse',
    category: 'Short-Form',
    youtubeId: 'ScMzIvxBSi4',
    year: '2024',
    description: 'Viral-ready social content that captures attention in the first frame.',
    featured: false,
    status: 'published',
  },
  {
    id: 4,
    title: 'Horizon',
    category: 'Long-Form',
    youtubeId: '2Gg6Seob5Mg',
    year: '2023',
    description: 'Documentary-style YouTube content with cinematic color grading.',
    featured: false,
    status: 'published',
  },
  {
    id: 5,
    title: 'Neon Dreams',
    category: 'Long-Form',
    youtubeId: 'C0DPdy98e4c',
    year: '2023',
    description: 'A neon-lit journey through urban nightlife captured in stunning visuals.',
    featured: true,
    status: 'published',
  },
  {
    id: 6,
    title: 'Terra',
    category: 'Short-Form',
    youtubeId: 'YE7VzlLtp-4',
    year: '2023',
    description: 'Nature-inspired brand film with sweeping landscape cinematography.',
    featured: false,
    status: 'published',
  },
];

export const SiteProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [heroYoutubeId, setHeroYoutubeId] = useState('dQw4w9WgXcQ');
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
        projects,
        setProjects,
        heroYoutubeId,
        setHeroYoutubeId,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => useContext(SiteContext);
