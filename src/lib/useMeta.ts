import { useEffect } from 'react';

type MetaOptions = {
  title: string;
  description: string;
  image?: string;
  url?: string;
};

const setTag = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Устанавливает title и мета-теги (description, Open Graph, Twitter) для страницы */
export function useMeta({ title, description, image, url }: MetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    setTag('meta[name="description"]', 'name', 'description', description);
    setTag('meta[property="og:title"]', 'property', 'og:title', title);
    setTag('meta[property="og:description"]', 'property', 'og:description', description);
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (url) setTag('meta[property="og:url"]', 'property', 'og:url', url);
    if (image) {
      setTag('meta[property="og:image"]', 'property', 'og:image', image);
      setTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, url]);
}
