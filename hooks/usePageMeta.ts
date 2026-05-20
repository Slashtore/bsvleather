import { useEffect } from 'react';

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    // Title
    document.title = `${title} | BSV Leather`;
    
    // Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    
    // OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', `${title} | BSV Leather`);
    if (ogDesc) ogDesc.setAttribute('content', description);
    
    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const path = window.location.hash ? window.location.hash : window.location.pathname;
      canonical.setAttribute('href', `https://bsvleather.ru${path || '/'}`);
    }
  }, [title, description]);
}