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
    title: 'Short-Form Reel 1',
    category: 'Short-Form',
    youtubeId: 'i_cEGiAhksI',
    year: '2024',
    description: 'Scroll-stopping short-form content built for maximum engagement.',
    featured: true,
    status: 'published',
  },
  {
    id: 3,
    title: 'Short-Form Reel 2',
    category: 'Short-Form',
    youtubeId: 'QPDdufkV4P0',
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
    title: 'Short-Form Reel 3',
    category: 'Short-Form',
    youtubeId: 'cjM49noOspM',
    year: '2024',
    description: 'Snappy reel built to trend on Instagram and TikTok.',
    featured: false,
    status: 'published',
  },
  {
    id: 7,
    title: 'Short-Form Reel 4',
    category: 'Short-Form',
    youtubeId: 'llSKkvkQmWY',
    year: '2024',
    description: 'High-retention short-form edit with hooks that stop the scroll.',
    featured: false,
    status: 'published',
  },
  {
    id: 8,
    title: 'Short-Form Reel 5',
    category: 'Short-Form',
    youtubeId: 'cjVljTYyM_Y',
    year: '2024',
    description: 'Platform-optimised vertical content with dynamic pacing.',
    featured: false,
    status: 'published',
  },
  {
    id: 9,
    title: 'Short-Form Reel 6',
    category: 'Short-Form',
    youtubeId: 'JTcblIswjYQ',
    year: '2024',
    description: 'Fast-cut social reel designed for maximum share potential.',
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
