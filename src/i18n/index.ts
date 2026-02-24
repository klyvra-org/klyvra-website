import { locales, defaultLocale, type Locale } from './locales';

// Eagerly import all JSON translation files
const translationModules = import.meta.glob('./*/*.json', { eager: true }) as Record<string, { default: Record<string, string> }>;

// Build a flat lookup: translations['en']['common']['nav.home'] = 'Home'
const translations: Record<string, Record<string, Record<string, string>>> = {};

for (const [path, mod] of Object.entries(translationModules)) {
  // path looks like ./en/common.json
  const match = path.match(/\.\/(\w+)\/(\w+)\.json$/);
  if (!match) continue;
  const [, lang, ns] = match;
  if (!translations[lang]) translations[lang] = {};
  translations[lang][ns] = mod.default;
}

/**
 * Get a translated string. Falls back to English if key is missing.
 * Key format: "namespace.key" e.g. "common.nav_home"
 */
export function t(locale: Locale, key: string): string {
  const [ns, ...rest] = key.split('.');
  const k = rest.join('.');
  return translations[locale]?.[ns]?.[k]
    ?? translations[defaultLocale]?.[ns]?.[k]
    ?? key;
}

/**
 * Get the locale from a URL pathname.
 */
export function getLocaleFromUrl(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && (locales as readonly string[]).includes(seg)) {
    return seg as Locale;
  }
  return defaultLocale;
}

/**
 * Build a localized path.
 * localizedPath('en', '/features') => '/features'
 * localizedPath('it', '/features') => '/it/features'
 * localizedPath('it', '/docs/quickstart') => '/it/docs/quickstart'
 */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean || '/';
  return `/${locale}${clean}`;
}
