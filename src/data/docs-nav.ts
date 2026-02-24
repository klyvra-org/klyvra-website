export interface DocsNavItem {
  slug: string;
  titleKey: string; // i18n key like "docs.nav_quickstart"
}

export interface DocsNavGroup {
  titleKey: string; // i18n key like "docs.nav_getting_started"
  items: DocsNavItem[];
}

export const docsNav: DocsNavGroup[] = [
  {
    titleKey: 'docs.nav_getting_started',
    items: [
      { slug: 'quickstart', titleKey: 'docs.nav_quickstart' },
      { slug: 'first-login', titleKey: 'docs.nav_first_login' },
    ],
  },
  {
    titleKey: 'docs.nav_core_concepts',
    items: [
      { slug: 'rbac', titleKey: 'docs.nav_rbac' },
      { slug: 'architecture', titleKey: 'docs.nav_architecture' },
      { slug: 'adapters', titleKey: 'docs.nav_adapters' },
    ],
  },
  {
    titleKey: 'docs.nav_tutorials',
    items: [
      { slug: 'add-users', titleKey: 'docs.nav_add_users' },
      { slug: 'custom-domain', titleKey: 'docs.nav_custom_domain' },
      { slug: 'helm', titleKey: 'docs.nav_helm' },
    ],
  },
  {
    titleKey: 'docs.nav_reference',
    items: [
      { slug: 'apps-ref', titleKey: 'docs.nav_apps_ref' },
      { slug: 'env-ref', titleKey: 'docs.nav_env_ref' },
      { slug: 'troubleshooting', titleKey: 'docs.nav_troubleshooting' },
      { slug: 'makefile-ref', titleKey: 'docs.nav_makefile_ref' },
    ],
  },
];

export const allDocSlugs = docsNav.flatMap(g => g.items.map(i => i.slug));
